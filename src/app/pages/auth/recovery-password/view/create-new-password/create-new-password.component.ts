import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { interval, take } from 'rxjs';
import { ICodeDeliveryDetails, IUserCredentials } from 'src/app/core/interfaces/auth.interfaces';
import { LoginService } from 'src/app/services/login.service';
import { CustomValidators } from '../../../utils/customValidation';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { UtilsService } from 'src/app/services/utils.service';
import { addIcons } from "ionicons";
import { closeCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import { COMMON_PASSWORDS } from '../../../const/common-password.constants';

@Component({
    selector: 'app-create-new-password',
    templateUrl: './create-new-password.component.html',
    styleUrls: ['./create-new-password.component.scss'],
    standalone: false
})
export class CreateNewPasswordComponent implements OnInit {

    userData!: ICodeDeliveryDetails;
    userCredentials!: IUserCredentials;
    counter: number = 90;
    error: string = '';
    eyeSvg: string = '../../../assets/icon/eye-view.svg';
    eyeSlashSvg: string = '../../../assets/icon/eye-hidden.svg';
    isShown: boolean = false;
    otpForm: FormGroup;
    otpDigits = [0, 1, 2, 3, 4, 5];
    passwordValue: string = '';

    fb = inject(FormBuilder);
    login = inject(LoginService)
    auth = inject(CognitoService)
    utilsService = inject(UtilsService)

    constructor() {
        this.otpForm = this.fb.group({
            otp: this.fb.array([
                new FormControl('', [Validators.required, CustomValidators.noSpaces]),
                new FormControl('', [Validators.required, CustomValidators.noSpaces]),
                new FormControl('', [Validators.required, CustomValidators.noSpaces]),
                new FormControl('', [Validators.required, CustomValidators.noSpaces]),
                new FormControl('', [Validators.required, CustomValidators.noSpaces]),
                new FormControl('', [Validators.required, CustomValidators.noSpaces])
            ]),
            newPassword: ['', [Validators.required, Validators.minLength(12), CustomValidators.customPasswordValidation, notCommonPassword]]
        });
        addIcons({ closeCircleOutline, checkmarkCircleOutline });

        this.otpForm.get('newPassword')?.valueChanges.subscribe(value => {
            this.passwordValue = value;
        });
    }

    ngOnInit(): void {
        this.initCounter();

        this.login.getRecoverPasswordDataObservable.subscribe((res: ICodeDeliveryDetails) => {
            this.userData = res;
            if (!res) {
                this.utilsService.navCtrl.navigateRoot(['/auth']);
            }
        });

        this.login.getUserCredentialsObservable.subscribe((res: IUserCredentials) => {
            this.userCredentials = res;
            if (!res) {
                this.utilsService.navCtrl.navigateRoot(['/auth']);
            }
        });
    }

    get otpInput() {
        return this.otpForm.get('otp') as FormArray;
    }

    get newPassword() {
        return this.otpForm.get('newPassword') as FormControl;
    }

    onInput(event: KeyboardEvent) {
        this.error = '';
        const input = event.target as HTMLInputElement;
        const index = parseInt(input.id);
        const value = event.key;
        const numbersOnly = /^\d*$/;
        const otpInputControls = this.otpInput.controls[index];

        if (!numbersOnly.test(value) && event.code !== 'Backspace') {
            event.preventDefault();
            return;
        }

        if (value.length === 1 && index < 5) {
            otpInputControls.setValue(value);
            input.value = value;
            event.preventDefault();

            const nextInput = input.nextElementSibling as HTMLInputElement;
            nextInput.focus();
        }

        if (event.code === 'Backspace' && index > 0) {
            if (input.value) {
                otpInputControls.setValue('');
                input.value = '';
                event.preventDefault();
            }

            const prevInput = input.previousElementSibling as HTMLInputElement;
            prevInput.focus();
        }
    }

    handleCharacters(event: KeyboardEvent) {
        if (event.key === ' ' && event.target && (event.target as HTMLInputElement).value.endsWith(' ')) {
            event.preventDefault();
            return;
        }
    }

    initCounter() {
        const timer$ = interval(1000).pipe(take(90));

        timer$.subscribe(() => {
            this.counter--;
        });
    }

    sendNewCode() {
        this.auth.recoverPassword(this.userCredentials).then(() => {
            this.counter = 90;
            this.initCounter();
        }).catch((err) => {
            console.error(err);
        });
    }

    navToLogin() {
        this.utilsService.navCtrl.navigateRoot(['recovery-password']);
    }

    confirmPasswordChange() {
        this.auth.confirmRecoverPassword(this.otpInput.value.join(''), this.newPassword.value).then(() => {
            this.utilsService.navCtrl.navigateRoot(['auth']);
            this.utilsService.getToastMessage('bottom', 3000, 'Contraseña actualizada')
        }).catch((err) => {
            this.error = err;
        });
    }

}

export function notCommonPassword(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const isCommon = COMMON_PASSWORDS.includes(value.trim());
  return isCommon ? { commonPassword: true } : null;
}
