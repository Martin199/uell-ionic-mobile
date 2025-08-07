import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  IonContent,
  IonText,
  IonList,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonPopover,
  IonIcon,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { SUPPORT_OPTIONS, SUPPORT_FIELDS } from '../const/support-const';
import { UtilsService } from 'src/app/services/utils.service';
import { ContactFormBody } from 'src/app/services/interfaces/auth-service.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CreateSuccessModalComponent } from '../components/create-success-modal/create-success-modal.component';
import { ServerErrorModalComponent } from 'src/app/pages/auth/components/server-error-modal/server-error-modal.component';
import { ModalOptions } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  imports: [
    IonToolbar,
    IonHeader,
    IonIcon,
    IonPopover,
    IonList,
    IonText,
    IonContent,
    IonButton,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    SharedModule,
  ],
})
export class SupportComponent {
  private formBuilder = inject(FormBuilder);
  private utilService = inject(UtilsService);
  private authService = inject(AuthService);
  private validationPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  private phoneValidationPattern = /^[0-9\s+]+$/;
  supportOptions = SUPPORT_OPTIONS;
  supportFields = SUPPORT_FIELDS;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.validationPattern)]],
    surname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.validationPattern)]],
    cuil: ['', [Validators.required, Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.pattern(this.phoneValidationPattern), Validators.maxLength(15)]],
    motive: ['', Validators.required],
    comentary: [''],
  });

  getFormControl(fieldKey: string): FormControl {
    return this.form.get(fieldKey) as FormControl;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const body: ContactFormBody = {
        name: this.form.value.name || '',
        surname: this.form.value.surname || '',
        cuil: this.form.value.cuil || '',
        email: this.form.value.email || '',
        phone: this.form.value.telephone || '',
        motive: this.form.value.motive || '',
        comentary: this.form.value.comentary || '',
      };
      this.authService.postSupportContact(body).subscribe({
        next: () => {
          const options: ModalOptions = {
            component: CreateSuccessModalComponent,
            componentProps: {
              type: 'success support',
              text: `Gracias por contactarte. En breve recibirás una respuesta al correo <strong>${
                this.form.get('email')?.value
              }</strong>.`,
              title: 'Tu solicitud fue enviada',
              image: 'assets/login/email.svg',
              button: 'login',
            },
          };
          this.utilService.presentModalWithOptions(options);
          this.utilService.navigateTo('/auth');
        },
        error: err => {
          console.error(err);
          const modalOptions: ModalOptions = {
            component: ServerErrorModalComponent,
            initialBreakpoint: 1,
            showBackdrop: true,
            cssClass: 'custom-modal',
          };
          this.utilService.presentModalWithOptions(modalOptions);
        },
      });
    } else {
      console.error('Form is not valid');
    }
  }

  goBack() {
    this.utilService.goBack();
  }

  onClickLogo() {
    this.utilService.navigateTo('/auth');
  }

  onSelectChange(event: any) {
    if (event.detail.value === 'Otro') {
      this.form.get('comentary')?.setValidators([Validators.required]);
      this.form.get('comentary')?.updateValueAndValidity();
    } else {
      this.form.get('comentary')?.clearValidators();
      this.form.get('comentary')?.updateValueAndValidity();
    }
  }
}
