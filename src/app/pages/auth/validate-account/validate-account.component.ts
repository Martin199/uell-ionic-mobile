import { Component, inject, signal } from '@angular/core';
import { IonContent, IonText, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatingHelpComponent } from '../components/floating-help/floating-help.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { IndividualInputsComponent } from '../components/individual-inputs/individual-inputs.component';
import { CreateSuccessModalComponent } from '../components/create-success-modal/create-success-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
  imports: [IonIcon, IonButton, IonText, IonContent, SharedModule, FloatingHelpComponent, IndividualInputsComponent],
})
export class ValidateAccountComponent {
  private utils = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  error = signal<boolean>(false);
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
      next: () => {
        loading.dismiss();
        this.presentModal(false);
      },
      error: err => {
        console.error('error create cognito user', err);
        loading.dismiss();
        this.error.set(true);
        if (err.status == 409) {
          this.presentModal(this.error());
        }
      },
    });
  }

  presentModal(error: boolean) {
    const modalData = {
      type: error ? 'error' : 'success',
      email: this.authService.email(),
    };
    this.utils.presentModal(CreateSuccessModalComponent, undefined, modalData);
  }
}
