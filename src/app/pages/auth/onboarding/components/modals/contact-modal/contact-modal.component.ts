import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent, IonSelectOption, IonLabel } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnBoardingContactPatch, TelephoneNumber } from '../../../interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { UserService } from 'src/app/services/user.service';
import { IonSelect } from '@ionic/angular/standalone';
import { baseNumberCountry, PhoneValidations } from '../../../const/my-profile-fields';

export interface ContactModalData {
  email: string;
  phone: TelephoneNumber;
}

export interface CountryCode {
  value: string;
  label: string;
  prefix: string;
  id: number;
  validations: PhoneValidations;
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
  private userService = inject(UserService);

  // Properties to receive data from componentProps
  email: string = '';
  phone: TelephoneNumber | null = null;
  countryCodes: CountryCode[] = [];
  selectedCountryValidations: PhoneValidations | null = null;

  contactForm = this.formBuilder.group({
    email: [this.userStateService.userData()?.email, [Validators.required, Validators.email]],
    phoneNumber: [this.userStateService.userData()?.cellphoneNumber.phoneNumber, [Validators.required]],
    countryCode: [this.userStateService.userData()?.cellphoneNumber.countryCode, [Validators.required]],
    areaCode: [this.userStateService.userData()?.cellphoneNumber.areaCode, [Validators.required]],
  });

  ngOnInit() {
    this.initializeCountryCodes();
    const currentCountryCode = this.contactForm.get('countryCode')?.value;
    if (currentCountryCode) {
      this.updateValidationsForCountry(currentCountryCode);
    }

    this.contactForm.get('countryCode')?.valueChanges.subscribe(countryCode => {
      if (countryCode) {
        this.updateValidationsForCountry(countryCode);
      }
    });
  }

  private initializeCountryCodes() {
    const countryValidations = baseNumberCountry.validations.country;
    this.countryCodes = Object.entries(countryValidations).map(([countryName, validations]) => ({
      value: validations.phoneValidations?.code.prefix || '',
      label: countryName,
      prefix: validations.phoneValidations?.code.prefix || '',
      id: validations.countryCode || 0,
      validations: validations.phoneValidations || {
        code: { prefix: '', minLength: 1, maxLength: 4 },
        phoneNumber: { minLength: 5, maxLength: 15, required: true },
      },
    }));
  }

  private updateValidationsForCountry(countryCode: string) {
    const selectedCountry = this.countryCodes.find(country => country.prefix === countryCode);
    if (selectedCountry) {
      this.selectedCountryValidations = selectedCountry.validations;

      // Update phone number validations
      const phoneNumberControl = this.contactForm.get('phoneNumber');
      if (phoneNumberControl) {
        const validations = selectedCountry.validations.phoneNumber;
        const pattern = new RegExp(`^\\+?[\\d\\s\\-\\(\\)]{${validations.minLength},${validations.maxLength}}$`);

        phoneNumberControl.setValidators([Validators.required, Validators.pattern(pattern)]);
        phoneNumberControl.updateValueAndValidity();
      }

      // Update area code validations
      const areaCodeControl = this.contactForm.get('areaCode');
      if (areaCodeControl && selectedCountry.validations.area) {
        const areaValidations = selectedCountry.validations.area;
        if (areaValidations.required) {
          areaCodeControl.setValidators([Validators.required]);
        } else {
          areaCodeControl.clearValidators();
        }
        areaCodeControl.updateValueAndValidity();
      }
    }
  }

  getControl(fieldName: string): FormControl {
    return this.contactForm.get(fieldName) as FormControl;
  }

  isAreaCodeRequired(): boolean {
    const required = this.selectedCountryValidations?.area?.required || false;
    if (!required) {
      this.contactForm.get('areaCode')?.setValue(null);
      this.contactForm.get('areaCode')?.clearValidators();
      this.contactForm.get('areaCode')?.updateValueAndValidity();
    }

    if (required) {
      this.contactForm.get('areaCode')?.setValidators([Validators.required]);
      this.contactForm.get('areaCode')?.updateValueAndValidity();
    }
    return required;
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const selectedCountry = this.countryCodes.find(country => country.prefix === this.contactForm.value.countryCode);
      const telephoneNumber: TelephoneNumber = {
        countryCode: this.contactForm.value.countryCode || '',
        areaCode: this.contactForm.value.areaCode || '',
        phoneNumber: this.contactForm.value.phoneNumber || '',
        id: selectedCountry?.id?.toString() || null,
      };
      const body: OnBoardingContactPatch = {
        email: this.contactForm.value.email || '',
        cellphoneNumber: telephoneNumber,
        telephoneNumber: telephoneNumber,
      };
      console.log('body post onboarding', body);
      this.userService.postOnBoardingContact(body).subscribe((res: any) => {
        this.userStateService.setUser(res);
      });
      this.modalCtrlr.dismiss(this.contactForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
