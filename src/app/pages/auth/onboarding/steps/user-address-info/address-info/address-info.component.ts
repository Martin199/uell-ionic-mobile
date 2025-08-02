import { Component, computed, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COUNTRY_ADDRESS_VALIDATIONS, countryENUM } from 'src/app/shared/constant/country-constants';
import {
  IAddressInfo,
  ICountryAddressValidation,
  IlocalitiesResponse,
  IStatesResponse,
} from 'src/app/shared/interface/country-interfaces';
import {} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController, IonContent } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { GoogleApisService } from 'src/app/services/google-apis.service';
import { OnBoardingCountryPatch } from '../../../interfaces';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
  ],
})
export class AddressInfoComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  storageService = inject(StorageService);
  userService = inject(UserService);
  utilsService = inject(UtilsService);
  userState = inject(UserStateService);
  googleApisService = inject(GoogleApisService);

  @Input() addressId: number = 0;
  addressInfo = output<{ data: IAddressInfo; isValid: boolean }>();
  user!: User;
  tenantParameters = computed(() => this.userState.tenantParameters());
  provincesResponse: IStatesResponse[] = [];
  localitiesResponse: IlocalitiesResponse[] = [];
  //TODO: cambiar default luego de hacer las pruebas
  country: countryENUM = countryENUM.OTHER;
  countryValidations: ICountryAddressValidation = COUNTRY_ADDRESS_VALIDATIONS[countryENUM.OTHER];
  loadingLocality: boolean = false;
  countries: any[] = [];
  countryId: number = 1;

  addressForm = new FormGroup({
    street: new FormControl('', { validators: [Validators.required] }),
    number: new FormControl(''),
    floor: new FormControl(''),
    apartment: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl<Country | null>(null, { validators: [Validators.required] }),
    province: new FormControl('', { validators: [Validators.required] }),
    locality: new FormControl('', { validators: [Validators.required] }),
    observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
  });

  constructor() {}

  ngOnInit() {
    this.setupFormListeners();
    this.setData();
    this.loadCountries();
    // this.loadStates();
    this.observerProvinceControl();
    // this.observerAddressInfoForm();
  }

  setupFormListeners() {
    this.addressForm.get('country')?.valueChanges.subscribe(country => {
      // Reset all form values except country
      this.addressForm.get('street')?.reset();
      this.addressForm.get('number')?.reset();
      this.addressForm.get('floor')?.reset();
      this.addressForm.get('apartment')?.reset();
      this.addressForm.get('postalCode')?.reset();
      this.addressForm.get('province')?.reset();
      this.addressForm.get('locality')?.reset();
      this.addressForm.get('observation')?.reset();

      this.provincesResponse = [];
      this.localitiesResponse = [];
      if (!country) {
        this.addressForm.get('province')?.disable();
        this.addressForm.get('locality')?.disable();
      } else {
        this.setValidations(country);
        this.addressForm.get('province')?.enable();
        this.loadStates(country);
        this.setCountryValidation(country.countryName);
        // this.loadProvinces(country);
      }
    });
  }

  setValidations(country: any) {
    this.countryId = country.id;
  }

  loadCountries() {
    this.userService.getAddressesCountry().subscribe({
      next: (res: any[]) => {
        this.countries = res.map(countries => ({
          ...countries,
          name: countries.countryName.charAt(0).toUpperCase() + countries.countryName.slice(1).toLowerCase(),
        }));
      },
      error: error => {
        console.error('Error loading provinces:', error);
      },
      complete: () => {},
    });
  }

  private loadStates(country: any) {
    this.userService.getAddressesState(country.id).subscribe((res: IStatesResponse[]) => {
      res.forEach((e: IStatesResponse) => {
        e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1).toLowerCase();
      });
      this.provincesResponse = res;
      if (this.provincesResponse.length > 0) {
        this.addressForm.controls.province.enable();
      }
    });
  }

  setData() {
    this.user = this.utilsService.getUser();
    const countryEnum = this.utilsService.findCountryEnum(this.tenantParameters()?.country ?? countryENUM.ARGENTINA);
    this.country = countryEnum;
    this.setCountryValidation(this.country);
  }

  setCountryValidation(country: countryENUM) {
    this.countryValidations = COUNTRY_ADDRESS_VALIDATIONS[country];
    this.selectCountryAddressForm();
  }

  selectCountryAddressForm() {
    this.addressForm.clearValidators();
    this.configureFormValidators();
  }

  configureFormValidators() {
    const validations = this.countryValidations;
    const formFields = ['street', 'number', 'floor', 'apartment', 'postalCode', 'province', 'locality', 'observation'];

    formFields.forEach(field => {
      const control = this.addressForm.get(field);
      const fieldValidation = validations[field as keyof typeof validations];

      if (control && fieldValidation) {
        const validators: any[] = [];

        // Add required validator if specified
        if (fieldValidation.required) {
          validators.push(Validators.required);
        }

        // Add pattern validator if specified
        if (fieldValidation.pattern) {
          validators.push(Validators.pattern(fieldValidation.pattern));
        }

        // Add minLength validator if specified
        if (fieldValidation.minLength) {
          validators.push(Validators.minLength(fieldValidation.minLength));
        }

        // Add maxLength validator if specified
        if (fieldValidation.maxLength) {
          validators.push(Validators.maxLength(fieldValidation.maxLength));
        }

        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }

  private observerProvinceControl() {
    this.addressForm.get('province')?.valueChanges.subscribe(() => {
      this.loadingLocality = true;
      this.addressForm.get('locality')?.reset();
      this.localitiesResponse = [];
      const value = this.addressForm.get('province')?.value as any;
      const id = value?.id + '';
      // this.addressForm.get('locality')?.disable();
      if (value?.id) {
        this.userService.getLocalitiesByState(id).subscribe((res: IlocalitiesResponse[]) => {
          res.forEach((e: IlocalitiesResponse) => {
            e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1).toLowerCase();
            this.localitiesResponse.push(e);
          });
          if (this.localitiesResponse.length > 0) {
            this.addressForm.get('locality')?.updateValueAndValidity();
            this.loadingLocality = false;
          }
        });
      }
    });
  }

  // observerAddressInfoForm() {
  //     this.addressForm.valueChanges.subscribe((value) => {
  //         this.emitAddressInfo(value);
  //     });
  // }

  postAddress() {
    this.builAddressInfo(this.addressForm.value);
  }

  async builAddressInfo(formValue: any) {
    const contactInfo: IAddressInfo = {
      street: formValue.street,
      number: formValue.number,
      floor: formValue.floor,
      apartment: formValue.apartment,
      postalCode: formValue.postalCode,
      province: formValue.province,
      locality: formValue.locality,
      observation: formValue.observation,
    };
    // this.validacionGoogleMaps(contactInfo);
    const confirmAddress: any = await this.validacionGoogleMaps(contactInfo);
    if (confirmAddress) {
      this.patchAddress();
    } else {
    }
  }

  validacionGoogleMaps(addressInfo: IAddressInfo) {
    return this.googleApisService.validacionGoogleMaps(addressInfo);
  }

  patchAddress() {
    const body = this.googleApisService.getAddressPayload();
    if (!body) {
      console.error('No address payload found');
      return;
    }
    this.userService.patchOnBoardingAddress(body, this.addressId).subscribe({
      next: () => {
        this.postCountry();
      },
      error: err => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  postCountry() {
    const body: OnBoardingCountryPatch = { countryId: this.countryId };
    this.userService.postOnBoarding(body).subscribe({
      next: () => {},
      error: err => {
        console.error(err);
      },
      complete: () => {
        this.dismiss();
      },
    });
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}

interface Country {
  countryName: countryENUM;
  id: number;
  name: string;
}
