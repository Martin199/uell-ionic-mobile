import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICodeDeliveryDetails, IUserCredentials } from 'src/app/core/interfaces/auth.interfaces';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage  {

	error: string = '';
  login = inject (LoginService)
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
      console.log('envio de recovery exito')
    }).catch((err: any) => {
      console.log(err.code);
      console.error(err.message);
      switch (err.code) {
        case 'UserNotFoundException':
          this.error = 'El usuario no existe. Revisá y volvé a intentar.';
          break;
        case 'InvalidParameterException':
          this.error = 'Usuario y/o contraseña incorrectos. Intente nuevamente.';
          break;
        case 'NotAuthorizedException':
          this.error = 'No es posible recuperar la contraseña, tu email aún no fue validado.' +
            'Primero tenés que ingresar con tu usuario y clave temporaria, enviada en el email de bienvenida.';
          break;
        case 'InvalidPasswordException':
          this.error = 'Debes primero iniciar sesión con la clave temporaria enviada por el Administrador de Uell, para validar tu correo electrónico.' +
            'Si no dispones de ella por favor solicitar nuevamente invitación a soporte@uell.com.ar';
          break;
        default:
          this.error = 'Ocurrió un error inesperado, intente nuevamente.';
          break;
      }
    });
  }

  navToSecurityCode(res: ICodeDeliveryDetails) {
    this.login.setRecoverPasswordDataObservable = res;
    this.utilsService.router.navigate(['/recovery-password/security-code']);
  }
  
  navToLogin() {
    this.utilsService.router.navigate(['auth']);
  }


}
