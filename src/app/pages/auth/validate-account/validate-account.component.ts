import { Component, inject, signal } from '@angular/core';
import { IonContent, IonText, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatingHelpComponent } from '../components/floating-help/floating-help.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { IndividualInputsComponent } from '../components/individual-inputs/individual-inputs.component';
import {
  CreateSuccessModalComponent,
  SuccessModalData,
} from '../components/create-success-modal/create-success-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { UserStateService } from 'src/app/core/state/user-state.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonText,
    IonContent,
    SharedModule,
    FloatingHelpComponent,
    IndividualInputsComponent,
    RouterLink,
  ],
})
export class ValidateAccountComponent {
  private utils = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private userStateService = inject(UserStateService);
  branding = this.userStateService.branding;
  error = signal<number>(0);
  form = this.formBuilder.group({
    cuil: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    code: [null, [Validators.required]],
  });

  async submit() {
    const loading = await this.utils.loading();
    await loading.present();
    const cuil = this.form.value.cuil;
    const code = this.form.value.code;
    if (!cuil || !code) return;
    this.authService.createCognitoUser(cuil, code).subscribe({
      next: res => {
        this.error.update(value => value + 1);
        loading.dismiss();
        if (res.code === "2001") {
          this.presentModal('error');
        } else if (res.code === "2002" || res.code === "2003") {
          this.presentModal('contact support');
        } else if (res.code === "201") {
          this.presentModal('success account');
        } else if (res.code === "2004") {
          this.presentModal('user exists');
        } else if (this.error() === 3) {
          this.presentModal('error');
        }
      },
      error: err => {
        console.error('error create cognito user', err);
        loading.dismiss();
        this.error.set(3);
        if (err.status == 409 || err.status == 500) {
          this.presentModal('contact support');
        }
      },
    });
  }

  presentModal(type: 'success account' | 'success support' | 'error' | 'user exists' | 'contact support') {
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
        > para iniciar sesión en Uell.`;
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
}
