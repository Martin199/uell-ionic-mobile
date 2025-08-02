import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { ProfileValidationsService } from 'src/app/services/profile-validations.service';
import { IAddressInfo } from 'src/app/shared/interface/country-interfaces';
import { GoogleApisService } from 'src/app/services/google-apis.service';
// import { AdressResponse } from '../../../interfaces';

export interface AddressModalData {
  country: string;
  province: any;
  department: any;
  address: string;
  addressNumber: string;
  addressFloor: string;
  addressDepartment: string;
  zip: string;
}

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonSelect,
    IonSelectOption,
    SharedModule,
  ],
})
export class AddressModalComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private phoneValidations = inject(ProfileValidationsService);
  private googleApisService = inject(GoogleApisService);

  // Properties to receive data from componentProps
  country: string = '';
  province: any = null;
  department: any = null;
  address: string = '';
  addressNumber: string = '';
  addressFloor: string = '';
  addressDepartment: string = '';
  zip: string = '';
  @Input() addressId: number = 0;

  // Data arrays for selects
  countries: any[] = [];
  provinces: any[] = [];
  departments: any[] = [];
  loadingCountries = false;
  loadingProvinces = false;
  loadingDepartments = false;
  addressValidations: any;

  addressForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    province: [{ value: '', disabled: true }, [Validators.required]],
    department: [{ value: '', disabled: true }, [Validators.required]],
    address: ['', [Validators.required]],
    addressNumber: ['', [Validators.required]],
    addressFloor: [''],
    addressDepartment: [''],
    zip: ['', [Validators.required, Validators.pattern(/^\d{4}(-\d{4})?$/)]],
  });

  ngOnInit() {
    this.addressForm.patchValue({
      country: this.country || '',
      province: this.province || '',
      department: this.department || '',
      address: this.address || '',
      addressNumber: this.addressNumber || '',
      addressFloor: this.addressFloor || '',
      addressDepartment: this.addressDepartment || '',
      zip: this.zip || '',
    });

    // Set up form change listeners
    this.setupFormListeners();
    this.loadCountries();
  }

  setupFormListeners() {
    // When country changes, load provinces
    this.addressForm.get('country')?.valueChanges.subscribe(country => {
      this.addressForm.get('province')?.reset();
      this.addressForm.get('department')?.reset();
      this.provinces = [];
      this.departments = [];

      // Disable province and department when no country is selected
      if (!country) {
        this.addressForm.get('province')?.disable();
        this.addressForm.get('department')?.disable();
      } else {
        this.setValidations(country);
        this.addressForm.get('province')?.enable();
        this.loadProvinces(country);
      }
    });
  

    // When province changes, load departments
    this.addressForm.get('province')?.valueChanges.subscribe((province: any) => {
      this.addressForm.get('department')?.reset();
      this.departments = [];

      // Disable department when no province is selected
      if (!province) {
        this.addressForm.get('department')?.disable();
      } else {
        this.addressForm.get('department')?.enable();
        if (typeof province === 'object' && province.id) {
          this.loadDepartments(province.id);
        }
      }
    });
  }

  setValidations(country: any) {
    const selectedCountry = this.countries.find(c => c.id == country);
    if (!selectedCountry?.countryName) {  return; }
    const countryUpperCase = selectedCountry.countryName.toUpperCase();
    this.addressValidations = this.phoneValidations.returnGlobalsConfig().validations.country[countryUpperCase].addressValidations;
    this.updateAddressValidations();
  }

  loadCountries() {
    this.loadingCountries = false;
    this.userService.getAddressesCountry().subscribe({
      next: (res: any[]) => {
        this.countries = res.map(countries => ({
          ...countries,
          name: countries.countryName.toUpperCase(),
        }));
      },
      error: error => {
        console.error('Error loading provinces:', error);
      },
      complete: () => {
        this.loadingCountries = false;
      },
    });
  }

  loadProvinces(countryId: string) {
    this.loadingProvinces = true;
    this.userService.getAddressesState(countryId).subscribe({
      next: (res: any[]) => {
        this.provinces = res.map(province => ({
          ...province,
          name: province.name.toUpperCase(),
        }));
        this.loadingProvinces = false;
      },
      error: error => {
        console.error('Error loading provinces:', error);
        this.loadingProvinces = false;
      },
    });
  }

  loadDepartments(provinceId: string) {
    this.loadingDepartments = true;
    this.userService.getLocalitiesByState(provinceId).subscribe({
      next: (res: any[]) => {
        this.departments = res.map(department => ({
          ...department,
          name: department.name.toUpperCase(),
        }));
        this.loadingDepartments = false;
      },
      error: error => {
        console.error('Error loading departments:', error);
        this.loadingDepartments = false;
      },
    });
  }

  getControl(fieldName: string): FormControl {
    return this.addressForm.get(fieldName) as FormControl;
  }

  updateAddressValidations() {
    this.addressForm.get('addressNumber')!.setValidators([
      this.addressValidations.addressNumber.required ? Validators.required : Validators.nullValidator,
    ]);

    this.addressForm.get('addressNumber')!.setValidators([
      this.addressValidations.addressNumber.required ? Validators.required : Validators.nullValidator,
    ]);

    const zipCtrl = this.addressForm.get('zip')!;
    zipCtrl.clearValidators();
    const zipValidators = [];
    if (this.addressValidations.addressCodePostal.required) {
      zipValidators.push(Validators.required);
    }
    if (this.addressValidations.addressCodePostal.minLength) {
      zipValidators.push(
        Validators.minLength(this.addressValidations.addressCodePostal.minLength)
      );
    }
    if (this.addressValidations.addressCodePostal.maxLength) {
      zipValidators.push(
        Validators.maxLength(this.addressValidations.addressCodePostal.maxLength)
      );
    }
    zipCtrl.setValidators(zipValidators);
    zipCtrl.updateValueAndValidity();
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      console.log('Form submitted:', this.addressForm.value);
      // const contactInfo: IAddressInfo = {
      //       street: formValue.address!, 
      //       number: formValue.addressNumber!,
      //       floor: formValue.addressFloor!,
      //       apartment: formValue.addressDepartment!,
      //       postalCode: formValue.zip!,
      //       province: formValue.province!,
      //       locality: formValue.department!,
      //       observation: formValue.observation,
      //   };
      const body: any = {
        
      }
    //       const postBody = this.addressForm.value;
    // postBody.userId = localStorage.getItem('userId');
    // postBody.id = this.addressData.id;
    // postBody.country = this.country
      this.userService.patchOnBoardingAddress(body, this.addressId).subscribe({
        next: (res: any) => {
              // validacionGoogleMaps(addressInfo: IAddressInfo) {
        // this.googleApisService.validacionGoogleMaps(addressInfo);
        // this.validacionGoogleMaps();
    // }
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });

      this.modalCtrlr.dismiss(this.addressForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

    validacionGoogleMaps(addressInfo: IAddressInfo) {
      const aux = this.googleApisService.validacionGoogleMaps(addressInfo);
    }

  //? fe-core:
      // this.contactForm.markAllAsTouched();
      // if (this.contactForm.valid) {
      //   const selectedCountry = this.countryCodes.find(country => country.prefix === this.contactForm.value.countryCode);
      //   const telephoneNumber: TelephoneNumber = {
      //     countryCode: this.contactForm.value.countryCode || '',
      //     areaCode: this.contactForm.value.areaCode || '',
      //     phoneNumber: this.contactForm.value.phoneNumber || '',
      //     id: selectedCountry?.id?.toString() || null,
      //   };
      //   const body: OnBoardingContactPatch = {
      //     email: this.contactForm.value.email || '',
      //     cellphoneNumber: telephoneNumber,
      //     telephoneNumber: telephoneNumber,
      //   };
      //   console.log('body post onboarding', body);
      //   this.userService.postOnBoardingContact(body).subscribe((res: any) => {
      //     this.userStateService.setUser(res);
      //   });
      //   this.modalCtrlr.dismiss(this.contactForm.value);
      // } else {
      //   console.log('Form is not valid');
      // }

  dismiss() {
    this.modalCtrlr.dismiss();
  }

}
