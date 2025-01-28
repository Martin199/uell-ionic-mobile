export class ErrorMessagesUtil {
    
    static getErrorMessage(code: string): string {
      switch (code) {
        case 'UserNotFoundException':
          return 'El usuario no existe. Revisá y volvé a intentar.';
        case 'InvalidParameterException':
          return 'Usuario y/o contraseña incorrectos. Intente nuevamente.';
        case 'NotAuthorizedException':
          return 'No es posible recuperar la contraseña, tu email aún no fue validado. ' +
            'Primero tenés que ingresar con tu usuario y clave temporaria, enviada en el email de bienvenida.';
        case 'InvalidPasswordException':
          return 'Debes primero iniciar sesión con la clave temporaria enviada por el Administrador de Uell, para validar tu correo electrónico. ' +
            'Si no dispones de ella por favor solicitar nuevamente invitación a soporte@uell.com.ar';
        default:
          return 'Ocurrió un error inesperado, intente nuevamente.';
      }
    }
  }
  