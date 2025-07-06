import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICodeDeliveryDetails, IUserCredentials } from 'src/app/core/interfaces/auth.interfaces';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ErrorMessagesUtil } from '../utils/getErrorMessage';

@Component({
    selector: 'app-recovery-password',
    templateUrl: './recovery-password.page.html',
    styleUrls: ['./recovery-password.page.scss'],
    standalone: false
})
export class RecoveryPasswordPage {

    error: string = '';
    login = inject(LoginService)
    auth = inject(CognitoService);
    utilsService = inject(UtilsService);

    forgotForm = new FormGroup({
        username: new FormControl('', [Validators.minLength(8), Validators.maxLength(12), Validators.required]),
    })

    constructor() { }

    onSubmitForgotForm() {

        this.error = '';
        const userCredentials: IUserCredentials = {
            username: this.forgotForm.value.username!.trim(),
            password: ''
        };
        this.login.setUserCredentialsObservable = userCredentials;
        this.auth.recoverPassword(userCredentials).then((res: ICodeDeliveryDetails) => {
            this.navToSecurityCode(res);
        }).catch((err: any) => {
            this.navToSecurityCode(err);
        });
    }

    navToSecurityCode(res: ICodeDeliveryDetails) {
        this.login.setRecoverPasswordDataObservable = res;
        this.utilsService.navCtrl.navigateRoot(['/recovery-password/security-code']);
    }

    navToLogin() {
        this.utilsService.navCtrl.navigateRoot(['auth']);
    }


}
