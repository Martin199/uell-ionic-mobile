import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { RegexCommon } from 'src/app/services/regex.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COMMON_PASSWORDS } from '../const/common-password.constants';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.page.html',
    styleUrls: ['./create-password.page.scss'],
    standalone: false
})
export class CreatePasswordPage {

    createNewPassForm: FormGroup;

    formBuilder = inject(FormBuilder);
    regex = inject(RegexCommon);
    cognitoService = inject(CognitoService);
    utilsService = inject(UtilsService);

    user: any | null = null;
    showPass: boolean = false;
    showPass2: boolean = false;
    loading: boolean = false;
    passwordValue: string = '';
    passwordStrength: string = 'Bajo';
    securityLevel: number = 0;

    constructor() {
        this.user = this.cognitoService.getUserFirst();
        if (null === this.user) {
            // TODO Handle it
            this.utilsService.navCtrl.navigateRoot(['auth']);
            throw new Error('CurrentUser not found');
        }

        this.createNewPassForm = this.formBuilder.group({
            newPass: ['', [Validators.required, Validators.minLength(12), notCommonPassword ]]
        });

        this.createNewPassForm.get('newPass')?.valueChanges.subscribe(value => {
            this.passwordValue = value;
            this.evaluatePasswordStrength(value);
        });
    }

    hasShowPass() {
        return this.showPass;
    }

    setShowPass() {
        this.showPass = !this.showPass;
    }

    hasShowPass2() {
        return this.showPass2;
    }

    setShowPass2() {
        this.showPass2 = !this.showPass2;
    }

    onSubmit() {
        this.loading = true;
        if (this.createNewPassForm.valid) {
            this.cognitoService.changeFirstPassword(this.createNewPassForm.value.newPass).then(() => {
                this.utilsService.navCtrl.navigateRoot(['login'], {
                    queryParams: {
                        message: 'no+hemos+podido+completar+la+operacion'
                    }
                });
            }).catch((error) => {
                console.error('changeFirstPassword error: ', error);
            }).finally(() => {
                this.loading = false;
                this.utilsService.getToastMessage('bottom', 3000, 'Contraseña actualizada')
                this.goToLogin();
            });
        }
    }

    goToLogin() {
        this.utilsService.navCtrl.navigateRoot(['auth']);
    }

    evaluatePasswordStrength(password: string): void {
        const hasLength = password.length >= 12;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9\s]/.test(password);

        const validBasic = hasLength && hasLower && hasUpper && hasNumber;

        if (!validBasic) {
            this.passwordStrength = 'Baja';
            this.securityLevel = 1;
        } else if (validBasic && !hasSymbol) {
            this.passwordStrength = 'Media';
            this.securityLevel = 2;
        } else if (validBasic && hasSymbol) {
            this.passwordStrength = 'Alta';
            this.securityLevel = 3;
        }
    }
    
    get canSubmit(): boolean {
        return this.createNewPassForm.valid && this.securityLevel >= 2 && !this.loading;
    }

}

export function notCommonPassword(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const isCommon = COMMON_PASSWORDS.includes(value.trim().toLowerCase());
  return isCommon ? { commonPassword: true } : null;
}