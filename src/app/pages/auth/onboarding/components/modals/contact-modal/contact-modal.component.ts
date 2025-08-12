import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent, IonSelectOption, IonLabel } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnBoardingContactPatch, TelephoneNumber } from '../../../interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { IonSelect } from '@ionic/angular/standalone';
import { baseNumberCountry, PhoneValidations } from '../../../const/my-profile-fields';
import { existingEmailValidator } from 'src/validators/validator-existing-email.directive';
import { UserService } from 'src/app/services/user.service';

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

  email: string = '';
  phone: TelephoneNumber | null = null;
  countryCodes: CountryCode[] = [];
  selectedCountry = signal<CountryCode | null>(null);

  contactForm = this.formBuilder.group({
    email: this.formBuilder.control<string>(this.userStateService.userData()?.email ?? '', {
      validators: [Validators.required, Validators.email, Validators.maxLength(50)],
      asyncValidators: [existingEmailValidator(this.userService, this.userStateService.userData()?.email ?? '')],
    }),
    phoneNumber: this.formBuilder.control<string>(this.userStateService.userData()?.cellphoneNumber.phoneNumber ?? '', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    countryCode: this.formBuilder.control<string>(this.userStateService.userData()?.cellphoneNumber.countryCode ?? '', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    areaCode: this.formBuilder.control<string>(this.userStateService.userData()?.cellphoneNumber.areaCode ?? '', {
      validators: [Validators.required],
      nonNullable: true,
    }),
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
        this.contactForm.patchValue({
          phoneNumber: '',
          areaCode: '',
        });
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
    if (!selectedCountry) {
      console.error('No se encontró el país');
      return;
    }
    const digitPattern = /^[0-9]+$/;
    this.selectedCountry.set(selectedCountry);

    // Update phone number validations
    const phoneNumberControl = this.contactForm.get('phoneNumber');
    if (phoneNumberControl) {
      const validations = selectedCountry.validations.phoneNumber;

      // Create a more specific pattern based on the country's requirements
      phoneNumberControl.setValidators([
        Validators.required,
        Validators.pattern(digitPattern),
        Validators.minLength(validations.minLength),
        Validators.maxLength(validations.maxLength),
      ]);
      phoneNumberControl.updateValueAndValidity();
    }

    // Update area code validations
    const areaCodeControl = this.contactForm.get('areaCode');
    if (areaCodeControl) {
      if (selectedCountry.validations.area) {
        const areaValidations = selectedCountry.validations.area;
        const validators = [];

        if (areaValidations.required) validators.push(Validators.required);

        if (areaValidations.minLength) validators.push(Validators.minLength(areaValidations.minLength));

        if (areaValidations.maxLength) validators.push(Validators.maxLength(areaValidations.maxLength));
        else validators.push(Validators.maxLength(15));

        // Add pattern validation for area code (only digits)
        validators.push(Validators.pattern(digitPattern));

        areaCodeControl.setValidators(validators);
      } else {
        areaCodeControl.clearValidators();
      }
      areaCodeControl.updateValueAndValidity();
    }
  }

  getControl(fieldName: string): FormControl {
    return this.contactForm.get(fieldName) as FormControl;
  }

  isAreaCodeRequired(): boolean {
    return this.selectedCountry()?.validations.area?.required || false;
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const telephoneId = this.userStateService.userData()!.cellphoneNumber.id;
      const telephoneNumber: TelephoneNumber = {
        countryCode: this.contactForm.value.countryCode!,
        areaCode: this.contactForm.value.areaCode || null,
        phoneNumber: this.contactForm.value.phoneNumber!,
        id: telephoneId,
      };
      const body: OnBoardingContactPatch = {
        email: this.contactForm.value.email!,
        cellphoneNumber: telephoneNumber,
        telephoneNumber: telephoneNumber,
      };
      this.userService.postOnBoarding(body).subscribe((res: any) => {
        this.userStateService.setUser(res);
      });
      this.modalCtrlr.dismiss(this.contactForm.value);
    } else {
      console.error('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
