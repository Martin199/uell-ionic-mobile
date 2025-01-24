import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthentication, ICodeDeliveryDetails, IUserCredentials } from 'src/app/core/interfaces/auth.interfaces';
import { AuthenticationProvider } from 'src/app/core/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage  {

	error: string = '';
  formBuilder = inject(FormBuilder) 
  login = inject (LoginService)
  auth = inject<IAuthentication>(AuthenticationProvider);
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
      const response = err.message;
      // TODO: Reemplazar los err.message por err.code cuando se definan correctamente las respuestas.
      if (response.includes('User does not exist.')) {
        this.error = 'El usuario no existe. <br>Revisá y volvé a intentar.';
      } else if (response.includes('Incorrect username or password.')) {
        this.error = 'Usuario y/o contraseña incorrectos. Intente nuevamente.';
      } else if (response.includes('Cannot reset password for the user as there is no registered/verified email or phone_number')) {
        this.error = 'No es posible recuperar la contraseña, tu email aún no fue validado. <br>' +
          'Primero tenés que ingresar con tu usuario y clave temporaria, enviada en el email de bienvenida.';
      } else if (response.includes('User password cannot be reset in the current state.')) {
        this.error = 'Debes primero iniciar sesión con la clave temporaria enviada por el Adminsitrador de Uell, para validar tu correo electrónico. <br>' +
        'Si no dispones de ella por favor solicitar nuevamente invitación a soporte@uell.com.ar';
      } else {
        this.error = 'Ocurrió un error inesperado, intente nuevamente.';
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
