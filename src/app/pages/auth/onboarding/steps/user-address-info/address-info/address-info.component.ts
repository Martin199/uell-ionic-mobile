import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantParameters } from 'src/app/core/interfaces/tenantParameters';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COUNTRY_ADDRESS_VALIDATIONS, countryENUM } from 'src/app/shared/constant/country-constants';
import { IAddressInfo, ICountryAddressValidation, IlocalitiesResponse, IStatesResponse } from 'src/app/shared/interface/country-interfaces';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent  implements OnInit {

  storageService = inject(StorageService);
  userService = inject(UserService);
  utilsService = inject (UtilsService);
  userState = inject(UserStateService);
  
  addressInfo = output<{data: IAddressInfo; isValid: boolean}>();
  user! : User ;
  tenantParameters: TenantParameters | null = null;
  provincesResponse: IStatesResponse[] = [];
  localitiesResponse: IlocalitiesResponse[] = [];
  //TODO: cambiar default luego de hacer las pruebas
  country: countryENUM = countryENUM.OTHER;
  countryValidations: ICountryAddressValidation = COUNTRY_ADDRESS_VALIDATIONS[countryENUM.OTHER];
  loadingLocality: boolean = false;

  addressForm = new FormGroup({
    street: new FormControl('', { validators: [Validators.required] }),
    number: new FormControl(''),
    floor: new FormControl(''),
    apartment: new FormControl(''),
    postalCode: new FormControl(''),
    province: new FormControl('', { validators: [Validators.required] }),
    locality: new FormControl('', { validators: [ Validators.required] }),
    observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
  });

  constructor() {
    this.tenantParameters  =  this.userState.tenantParameters();
    if (!this.tenantParameters) {
      console.error('No se puede datos de tenantparameters');
      return;
    }
   }

  ngOnInit() {
    this.setData();
    this.getProvincias();
    this.observerProvinceControl();
    this.observerAddressInfoForm();
  }

  setData() {
    this.user = this.utilsService.getUser();
    const countryEnum = this.utilsService.findCountryEnum(this.tenantParameters?.country ?? countryENUM.ARGENTINA);
    this.country = countryEnum;
    this.setCountryValidation(this.country);
  }

  setCountryValidation(country: countryENUM) {
    this.countryValidations = COUNTRY_ADDRESS_VALIDATIONS[country];
    this.selectCountryAddressForm();
  }

  selectCountryAddressForm() {
    switch (this.country) {
      case countryENUM.ARGENTINA:
        this.addressForm.clearValidators();
        this.formConfigArgentina();
        break;
  
      case countryENUM.COLOMBIA:
        this.addressForm.clearValidators();
        this.formConfigColombia();
        break;
  
      case countryENUM.PERU: //Se puede omitir
        this.addressForm.clearValidators();
        this.formConfigPeru();
        break;

      case countryENUM.ECUADOR:
        //TODO: Agregar validaciones de Ecuador
        // this.addressForm.clearValidators();
        this.formConfigEcuador();
        break;

      case countryENUM.OTHER:
        break;
  
      default:
        break;
    }
  }

  //TODO: simplificar en un solo metodo la configuracion del formulario usando COUNTRY_ADDRESS_VALIDATIONS[countryENUM.OTHER]
  formConfigArgentina() {
    this.addressForm.get('street')?.setValidators([
      Validators.required,
      Validators.pattern(COUNTRY_ADDRESS_VALIDATIONS.ARGENTINA.street.pattern),
    ]);
    this.addressForm.get('street')?.updateValueAndValidity();
    this.addressForm.get('number')?.setValidators([
      Validators.required,
      Validators.maxLength(5),
      Validators.pattern(/^[0-9]+$/),
    ]);
    this.addressForm.get('number')?.updateValueAndValidity();
    this.addressForm.get('floor')?.setValidators([
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]);
    this.addressForm.get('floor')?.updateValueAndValidity();
    this.addressForm.get('apartment')?.setValidators([
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]);
    this.addressForm.get('apartment')?.updateValueAndValidity();
    this.addressForm.get('postalCode')?.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(5),
      Validators.pattern(/^[0-9]+$/),
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
  }

  formConfigColombia() {
    this.addressForm.get('street')?.setValidators([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.\-#\s]+$/),
    ]);
    this.addressForm.get('street')?.updateValueAndValidity();
    this.addressForm.get('number')?.setValidators([
      Validators.maxLength(56),
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
      Validators.pattern(/^[0-9]+$/),
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

  formConfigPeru() {
    this.addressForm.get('street')?.setValidators([
      Validators.required,
    ]);
    this.addressForm.get('street')?.updateValueAndValidity();
    this.addressForm.get('number')?.setValidators([
    ]);
    this.addressForm.get('number')?.updateValueAndValidity();
    this.addressForm.get('floor')?.setValidators([
    ]);
    this.addressForm.get('floor')?.updateValueAndValidity();
    this.addressForm.get('apartment')?.setValidators([
    ]);
    this.addressForm.get('apartment')?.updateValueAndValidity();
    this.addressForm.get('postalCode')?.setValidators([
      Validators.minLength(5),
      Validators.pattern(/^[0-9]+$/),
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
  }

  formConfigEcuador() {
  }

  private getProvincias() {
    this.userService.getAddressesState().subscribe((res: IStatesResponse[]) => {
      res.forEach((e: IStatesResponse) => {
        e.name = e.name.toUpperCase();
      });
      this.provincesResponse = res;
      if (this.provincesResponse.length > 0) {
        this.addressForm.controls.province.enable();
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
            e.name = e.name.toUpperCase();
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

  observerAddressInfoForm() {
    this.addressForm.valueChanges.subscribe((value) => {
      this.emitAddressInfo(value);
    });
  }

  emitAddressInfo(formValue: any) {
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
    this.addressInfo.emit({
      data: contactInfo,
      isValid: this.addressForm.valid,
    });
  }

}
