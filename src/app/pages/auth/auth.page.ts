import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { AnimationController } from '@ionic/angular/standalone';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { PushNotifications } from '@capacitor/push-notifications';
import { EMPTY, forkJoin, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { TrackingService } from 'src/app/services/tracking.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { TenantParameters } from 'src/app/core/interfaces/tenantParameters';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
        ]),
        trigger('enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)', opacity: 1 }),
                animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
            ]),
        ]),
    ],
    standalone: false
})
export class AuthPage {
    @ViewChild('userContainer', { static: true }) userContainer!: ElementRef;
    @ViewChild('passwordContainer', { static: true })
    passwordContainer!: ElementRef;
    @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

    formAuth = new FormGroup({
        cuil: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    animationCtrl = inject(AnimationController);
    cognitoService = inject(CognitoService);
    userService = inject(UserService);
    utilsService = inject(UtilsService);
    storageService = inject(StorageService);
    trackingService = inject(TrackingService)

    version = environment?.version;
    env = environment?.env;
    private readonly sessionService = inject(SessionServiceService);
    private userState = inject(UserStateService);

    userDTO!: UserResponseDTO;
    hasMultipleTenants!: boolean;

    constructor() { }

    ngAfterViewInit() {
        this.animateElements();
    }

    async submit() {
        this.formAuth.markAllAsTouched();
        if (this.formAuth.invalid) {
          return;
        }

        const { cuil, password } = this.formAuth.value;
        const loading = await this.utilsService.loading();
        await loading.present();

        try {
            const result = await this.cognitoService.signIn(
                cuil as string,
                password as string
            );

            if (result) {
                if (result.type === 'passwordChange') {
                    this.utilsService.navCtrl.navigateRoot(['auth/create-new-password']);
                    loading.dismiss();
                    return;
                }

                this.storageService.saveToken();
                this.userState.setToken();

                this.userService
                    .getMe()
                    .pipe(
                        tap((user: UserResponseDTO) => {
                            this.storageService.setSessionStorage('user', user);
                            this.userDTO = user;
                            this.hasMultipleTenants = user.tenant.length > 1;

                            if (!this.hasMultipleTenants) {
                                this.userState.setTenant(user.tenant[0]);
                                this.storageService.setLocalStorage('tenant', user.tenant[0]);
                            }
                        }),
                        switchMap((user) => {
                            if (!this.hasMultipleTenants) {
                                return new Promise<typeof user>((resolve) =>
                                    setTimeout(() => resolve(user), 0)
                                );
                            }
                            return Promise.resolve(user);
                        }),
                        switchMap((user) =>
                            forkJoin({
                                tenantParameters: this.userService.getTenantParameters(),
                                userTenants: this.userService.getUserTenants(),
                                allSegmentation: this.userService.getAllSegmentation(),
                            }).pipe(
                                map((result) => ({
                                    ...result,
                                    user,
                                }))
                            )
                        )
                    )
                    .subscribe({
                        next: ({
                            tenantParameters,
                            userTenants,
                            allSegmentation,
                            user,
                        }) => {
                            this.storageService.setSessionStorage(
                              'tenantParameters',
                              tenantParameters
                            );
                            this.trackingService.trackingUser(user.id.toString(), 'LOGIN').subscribe()

                            if (this.hasMultipleTenants) {
                                this.utilsService.router.navigate(['/auth/select-tenants']);
                            } else {
                                this.userState.setTenant(user.tenant[0]);

                                if (user.onboarded) {
                                    this.utilsService.router.navigateByUrl('tabs/home');
                                } else {
                                    this.termsAndConditions(user);
                                }
                            }
                            if (Capacitor.isNativePlatform()) {
                                PushNotifications.checkPermissions().then((result) => {
                                    if (result.receive === 'granted') {
                                        this.sessionService.handleSession();
                                    }
                                });
                            }
                            loading.dismiss();
                        },
                        error: (error) => {
                            console.error(
                                'Error al obtener usuario o datos adicionales:',
                                error
                            );
                            loading.dismiss();
                        },
                    });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            this.formAuth.setErrors({ incorrect: true });
            loading.dismiss();
        }
    }

    termsAndConditions(user: UserResponseDTO) {
        this.userService.termsAndConditions(user?.id).subscribe((res: any) => {
            if (res.length > 0) {
                this.storageService.setSessionStorage('termsAndConditions', res);
                this.utilsService.navCtrl.navigateRoot(['/auth/term-and-conditions']);
            } else {
                this.userState.setTenant(user.tenant[0]);
                if (!this.userDTO.onboarded) {
                    this.utilsService.navCtrl.navigateRoot(['/auth/onboarding']);
                } else {
                    this.utilsService.navCtrl.navigateRoot(['tabs/home']);
                }
            }
        });
    }

    animateElements() {
        // Animación para el contenedor de usuario
        const userAnimation = this.animationCtrl
            .create()
            .addElement(this.userContainer.nativeElement)
            .duration(500)
            .delay(200)
            .easing('ease-out')
            .fromTo('opacity', '0', '1')
            .fromTo('transform', 'translateY(-50px)', 'translateY(0)');

        // Animación para el contenedor de contraseña
        const passwordAnimation = this.animationCtrl
            .create()
            .addElement(this.passwordContainer.nativeElement)
            .duration(500)
            .delay(400)
            .easing('ease-out')
            .fromTo('opacity', '0', '1')
            .fromTo('transform', 'translateY(-50px)', 'translateY(0)');

        // Reproduce las animaciones en secuencia
        userAnimation.play();
        passwordAnimation.play();
    }

    forgotPassword() {
        this.utilsService.navCtrl.navigateRoot(['/recovery-password']);
    }
}
