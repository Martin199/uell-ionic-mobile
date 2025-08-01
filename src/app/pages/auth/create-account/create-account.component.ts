import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonText, IonButton, IonRouterLink, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatingHelpComponent } from '../components/floating-help/floating-help.component';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServerErrorModalComponent } from 'src/app/src/app/pages/auth/onboarding/components/modals/server-error-modal/server-error-modal.component';
import {
  CreateSuccessModalComponent,
  SuccessModalData,
} from '../components/create-success-modal/create-success-modal.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  imports: [IonIcon, IonButton, IonContent, SharedModule, IonText, RouterLink, IonRouterLink, FloatingHelpComponent],
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  private utils = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private loading = signal<HTMLIonLoadingElement | null>(null);
  form = this.formBuilder.group({
    code: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  error = signal<boolean>(false);
  errorMsg = 'Parece que alguno de los datos ingresados no es correcto. Revísalos e intenta nuevamente.';

  navigateToValidateAccount() {
    this.utils.navigateTo('auth/create-account/validate-account');
  }

  getTenantCode() {
    const code = this.form.value.code;
    if (!code) return;
    this.authService.getTenantCode(code).subscribe({
      next: res => {
        this.loading()?.dismiss();
        if (res === null) {
          this.error.set(true);
          return;
        }
        this.generatePassword();
      },
      error: err => {
        this.loading()?.dismiss();
        if (err.status === 409 || err.status === 500) {
          this.utils.presentModal(ServerErrorModalComponent);
        }
        console.error('error get tenant code', err);
      },
    });
  }

  generatePassword() {
    const email = this.form.value.email;
    if (!email) return;
    this.authService.generatePassword(email).subscribe({
      next: res => {
        this.loading()?.dismiss();

        if (res.code === 2001) {
          this.presentModal('error');
        } else if (res.code === 2002 || res.code === 2003) {
          this.presentModal('contact support');
        } else if (res.code === 201) {
          this.presentModal('success account');
        } else if (res.code === 2004) {
          this.presentModal('user exists');
        } else {
          this.navigateToValidateAccount();
        }
      },
      error: err => {
        console.error(err);
        if (err.status === 409 || err.status === 500) {
          this.utils.presentModal(ServerErrorModalComponent);
        }
      },
    });
  }

  presentModal(type: 'error' | 'success account' | 'user exists' | 'contact support') {
    let text = '';
    let title = '';
    let image = '';
    let button: 'login' | 'support' = 'login';
    switch (type) {
      case 'error':
        title = 'Alcanzaste el número máximo de intentos permitidos';
        text = 'El codigo expiro o ya es obsoleto, debería volver a generarlo';
        image = 'assets/login/error.svg';
        button = 'support';
        break;
      case 'success account':
        text = `Te enviamos un usuario y contraseña temporal a <strong>${this.authService.email()}</strong
        >para iniciar sesión en Uell.`;
        title = '¡Ya creaste tu cuenta!';
        image = 'assets/login/success.svg';
        button = 'login';
        break;
      case 'user exists':
        text = `El numero de usuario ya se encuentra registrado en Uell deberas iniciar sesión con tu usuario o recuperar tu contraseña.`;
        title = '¡El usuario ya existe!';
        image = 'assets/login/error.svg';
        button = 'support';
        break;
      case 'contact support':
        text = 'Necesitamos que nos contactes a través de nuestro formulario de soporte.';
        title = 'Hubo un error';
        image = 'assets/login/error.svg';
        button = 'support';
        break;
      default:
        break;
    }
    const modalData: SuccessModalData = {
      type: type,
      title: title,
      image: image,
      text: text,
      button: button,
    };
    this.utils.presentModal(CreateSuccessModalComponent, undefined, modalData);
  }

  async submit() {
    this.loading.set(await this.utils.loading());
    await this.loading()!.present();
    this.getTenantCode();
  }
}
