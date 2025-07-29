import { Component, inject, OnInit, resource } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent, IonSelectOption, IonLabel } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnBoardingContactPatch, TelephoneNumber } from '../../../interfaces';
import { UserService } from 'src/app/services/user.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
import { IonSelect } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export interface ContactModalData {
  email: string;
  phone: TelephoneNumber;
}

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [
    IonLabel,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    SharedModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class ContactModalComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private userStateService = inject(UserStateService);
  private authService = inject(AuthService);

  countryCode = resource({
    loader: () => {
      return firstValueFrom(this.authService.getCountryCode());
    },
  });

  // Properties to receive data from componentProps
  email: string = '';
  phone: TelephoneNumber | null = null;

  contactForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
    countryCode: ['', [Validators.required]],
    areaCode: ['', [Validators.required]],
  });

  ngOnInit() {
    const tenantParameters = this.userStateService.tenantParameters();
    console.log('tenantParameters', tenantParameters);
    console.log('email:', this.email);
    console.log('phone:', this.phone);
    console.log('countryCode', this.countryCode.value());
    this.contactForm.patchValue({
      email: this.email || '',
      phoneNumber: this.phone?.phoneNumber || '',
      countryCode: this.phone?.countryCode || '',
      areaCode: this.phone?.areaCode || '',
    });
  }

  getControl(fieldName: string): FormControl {
    return this.contactForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      // const body: OnBoardingContactPatch = {
      //   email: this.contactForm.value.email || '',
      //   // phone: this.contactForm.value.phone || '',
      // };
      // console.log('body post onboarding', body);
      // this.userService.postOnBoarding(body).subscribe(res => {
      //   this.userStateService.setUser(res);
      // });
      this.modalCtrlr.dismiss(this.contactForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
