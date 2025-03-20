import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { SharedModule } from '../../shared.module';
import { countryENUM } from '../../constant/country-constants';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { TenantParametersResponse } from 'src/app/core/interfaces/tenantParameters';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddressComponent {

  addressInfo = output<{data: any; isValid: boolean}>();
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  provincias: any[] = [];
  public localidades: any[] = [];
  
  storageService = inject(StorageService);
  userService = inject(UserService);
  utilsService = inject (UtilsService);
  
  user! : User ;
  tenantParameters: TenantParametersResponse | null = null;
  country: countryENUM | string = countryENUM.ARGENTINA;

  addressForm = new FormGroup({
    street: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9.\-#\s]+$/)] }),
    number: new FormControl('', { validators: [Validators.maxLength(5), Validators.pattern(/^[a-zA-Z0-9\-#\s]+$/) ] }),
    floor: new FormControl('', { validators: [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(3)] }),
    apartment: new FormControl('', { validators: [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(3)] }),
    postalCode: new FormControl('', [Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(6), Validators.minLength(6)]),
    province: new FormControl('', { validators: [Validators.required] }),
    locality: new FormControl('', { validators: [ Validators.required] }),
    observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
    countryCode: new FormControl(''),
  });

  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
   }

  ngOnInit() {
    this.setData();
    this.getProvincias();
    this.provinciasChanges();
  }

  setData() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    this.country = this.tenantParameters!.tenantParameters.country ? this.tenantParameters!.tenantParameters.country : countryENUM.OTHER;
    this.user = this.utilsService.getUser();
    this.selectCountryAddressForm();
  }

  selectCountryAddressForm() {
    this.addressForm.clearValidators();
    switch (this.country) {
      case countryENUM.ARGENTINA:
        // this.enabledAreaCode();
        // this.setPhoneNumberValidators(6, 8);
        // this.setAreaCodeValidators(2, 4);
        // this.contactInfoForm.setValidators(this.sumCharactersValidator);
        break;
  
      case countryENUM.COLOMBIA:
        this.formConfigColombia();
        break;
  
      case countryENUM.PERU:
        // this.disabledAreaCode();
        // this.setPhoneNumberValidators(9, 9);
        break;

      case countryENUM.ECUADOR:
        // this.enabledAreaCode();
        // this.setPhoneNumberValidators(7, 9);
        // this.setAreaCodeValidators(2, 2);
        break;

      case countryENUM.OTHER:
        // this.disabledAreaCode();
        // this.setPhoneNumberValidators(8, 15);
        break;
  
      default:
        break;
    }
  }

  formConfigColombia() {
    this.addressForm.get('street')?.setValidators([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.\-#\s]+$/),
    ]);
    this.addressForm.get('street')?.updateValueAndValidity();
    this.addressForm.get('number')?.setValidators([
      Validators.maxLength(5),
      Validators.pattern(/^[a-zA-Z0-9\-#\s]+$/),
    ]);
    this.addressForm.get('number')?.updateValueAndValidity();
    this.addressForm.get('floor')?.setValidators([
      Validators.pattern(/^[a-zA-Z0-9]+$/),
      Validators.maxLength(3),
    ]);
    this.addressForm.get('floor')?.updateValueAndValidity();
    this.addressForm.get('apartment')?.setValidators([
      Validators.pattern(/^[a-zA-Z0-9]+$/),
      Validators.maxLength(3),
    ]);
    this.addressForm.get('apartment')?.updateValueAndValidity();
    this.addressForm.get('postalCode')?.setValidators([
      Validators.pattern(/^[0-9]\d*$/),
      Validators.maxLength(6),
      Validators.minLength(6),
    ]);
    this.addressForm.get('postalCode')?.updateValueAndValidity();
    this.addressForm.get('province')?.setValidators([
      Validators.required,
    ]);
    this.addressForm.get('province')?.updateValueAndValidity();
    this.addressForm.get('locality')?.setValidators([
      Validators.required,
    ]);
    this.addressForm.get('locality')?.updateValueAndValidity();
    this.addressForm.get('observation')?.setValidators([
      Validators.maxLength(250),
    ]);
    this.addressForm.get('observation')?.updateValueAndValidity();
  }

  private getProvincias() {
    // this.adressForm.controls.Provincia.disable();
    this.userService.getAddressesState().subscribe((res: any) => {
      res.forEach((e: any) => {
        e.name = e.name.toUpperCase();
      });
      this.provincias = res;
      if (this.provincias.length > 0) {
        this.addressForm.controls.province.enable();
        this.addressForm.controls.locality.disable();
      }
    });
  }

  private provinciasChanges() {
    this.addressForm.get('province')?.valueChanges.subscribe(() => {
      this.localidades = [];
      const value = this.addressForm.get('province')?.value as any;
      const id = value?.id + '';
      this.addressForm.controls.locality.reset();
      if (value?.id) {
        this.userService.getLocalitiesByState(id).subscribe((res: any) => {
          res.forEach((e: any) => {
            e.name = e.name.toUpperCase();
            this.localidades.push(e);
          });
          if (this.localidades.length > 0) {
            this.addressForm.controls.locality.enable();
          }
        });
      }
    });
  }

  observerAddressInfoForm() {
    this.addressForm.valueChanges.subscribe((value) => {
      this.emitAddressInfo(value);
    });
  }

  emitAddressInfo(formValue: any) {
    const contactInfo: any = {
      email: formValue.email,
      countryCode: formValue.countryCode,
      areaCode: formValue.areaCode || null,
      phoneNumber: formValue.phoneNumber,
    };

    this.addressInfo.emit({
      data: contactInfo,
      isValid: this.addressForm.valid,
    });
  }

}
