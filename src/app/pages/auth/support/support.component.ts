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
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { SUPPORT_OPTIONS, SUPPORT_FIELDS } from '../const/support-const';
import { UtilsService } from 'src/app/services/utils.service';
import { ContactFormBody } from 'src/app/services/interfaces/auth-service.interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  imports: [
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
    cuil: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.pattern(this.phoneValidationPattern), Validators.maxLength(15)]],
    reason: ['', Validators.required],
    comment: [''],
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
        reason: this.form.value.reason || '',
        comment: this.form.value.comment || '',
      };
      this.authService.postSupportContact(body).subscribe({
        next: () => {
          this.utilService.getToastMessage('top', 3000, 'Gracias por contactarnos, te responderemos lo antes posible.');
          this.utilService.navigateTo('/auth');
        },
        error: err => {
          console.error(err);
        },
      });
    } else {
      console.error('Form is not valid');
    }
  }

  onClickLogo() {
    this.utilService.navigateTo('/auth');
  }

  onSelectChange(event: any) {
    if (event.detail.value === 'Otro') {
      this.form.get('comment')?.setValidators([Validators.required]);
      this.form.get('comment')?.updateValueAndValidity();
    } else {
      this.form.get('comment')?.clearValidators();
      this.form.get('comment')?.updateValueAndValidity();
    }
  }
}
