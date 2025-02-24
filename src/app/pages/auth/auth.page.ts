import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { AnimationController } from '@ionic/angular';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
    trigger('enterAnimation', [
      transition(':enter', [style({ transform: 'translateX(100%)', opacity: 0 }), animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))]),
      transition(':leave', [style({ transform: 'translateX(0)', opacity: 1 }), animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))])
    ]),
  ],
})
export class AuthPage {

  @ViewChild('userContainer', { static: true }) userContainer!: ElementRef;
  @ViewChild('passwordContainer', { static: true }) passwordContainer!: ElementRef;
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  formAuth = new FormGroup({
    cuil: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  animationCtrl = inject(AnimationController)
  cognitoService = inject(CognitoService)
  userService = inject(UserService)
  utilsService = inject(UtilsService);
  storageService = inject(StorageService);
  private sessionService = inject(SessionServiceService)

  constructor() { }

  ngAfterViewInit() {
    this.animateElements();
  }


  async submit(){
    console.log(this.formAuth.value)
    if (this.formAuth.invalid) {
      console.log('Formulario inválido');
      return;
    }
  
    const { cuil, password } = this.formAuth.value;
    const loading = await this.utilsService.loading();
    await loading.present();
    try {
      const result = await this.cognitoService.signIn(cuil as string, password as string);
      console.log('Inicio de sesión exitoso:', result);
      if (result) {
        this.userService.getMe().subscribe((user) => {
          this.userService.setUser(user);
          console.log('Usuario:', user);
          this.storageService.setSessionStorage('user', user);
          PushNotifications.checkPermissions().then(result =>{
            if (result.receive === 'granted') this.sessionService.handleSession();
          })
          loading.dismiss();
          this.utilsService.router.navigate(['/auth/select-tenants']);
        });

        this.userService.getUserTenants().subscribe((user) => {
          console.log('getUserTenants:', user);
        });

        this.userService.getAllSegmentation().subscribe((user) => {
          console.log('getAllSegmentation:', user);
        });
      }
      // Redirige al usuario a la página principal o realiza otras acciones
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra un mensaje de error al usuario
    }
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

  forgotPassword(){
    this.utilsService.router.navigate(['/recovery-password']);
  }
}
