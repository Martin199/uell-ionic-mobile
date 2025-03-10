import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { GoogleApisService } from 'src/app/services/google-apis.service';
import { IAddressInfo } from '../../interface/country-interfaces';
import { TenantParametersResponse } from 'src/app/core/interfaces/tenantParameters';
import { countryENUM } from '../../constant/country-constants';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IAddressValidationResult } from 'src/app/services/interfaces/google-apis.interface';
import { AdressResponse } from 'src/app/pages/auth/onboarding/steps/user-address-info/interfaces/address-info.interface';

@Component({
  selector: 'app-modal-suggest-address',
  templateUrl: './modal-suggest-address.component.html',
  styleUrls: ['./modal-suggest-address.component.scss'],
})
export class ModalSuggestAddressComponent implements OnInit{

  private googleApisService = inject(GoogleApisService);
  storageService = inject(StorageService);
  utilsService = inject(UtilsService);

  // validationResult = input<IAddressValidationResult>();
  // addressInfo = input<IAddressInfo>();
  @Input() validationResult!: IAddressValidationResult;
  @Input() addressInfo!: any
  addressSuggest = signal('')
  addressUploaded = signal('')
  tenantParameters: TenantParametersResponse | null = null;
  addressSuggestObj: any;
  country: countryENUM = countryENUM.OTHER;
  uploadedAddressSelected: boolean = false;
  suggestAddressSelected: boolean = false;
  streetSuggestFlag: boolean = false
  addressPayload!: AdressResponse;

  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    const countryEnum = this.utilsService.findCountryEnum(this.tenantParameters!.tenantParameters?.country ? this.tenantParameters!.tenantParameters.country : countryENUM.ARGENTINA);
    this.country = countryEnum;
  }

  ngOnInit(): void {
    this.setUploadedAddress(this.addressInfo)
    this.setSuggestAddress(this.validationResult.addressComponents)
  }

  setUploadedAddress(addressInfo: IAddressInfo) {
    let addressUploaded = addressInfo.street;
    addressUploaded += addressInfo.number ? ` ${addressInfo.number}` : '';
    addressUploaded += addressInfo.postalCode && this.country === countryENUM.ARGENTINA ? ` C.P ${addressInfo.postalCode.slice(-4)}`
    : addressInfo.postalCode ? ` C.P ${addressInfo.postalCode}`
    : '';
    addressUploaded += addressInfo?.locality?.name ? `, ${this.utilsService.capitalizeText(addressInfo.locality.name)}` : '';
    addressUploaded += addressInfo?.province?.name ? `, ${this.utilsService.capitalizeText(addressInfo.province.name)}` : '';
    addressUploaded += this.country ? `, ${this.utilsService.capitalizeText(this.country)}` : '';
    this.addressUploaded.set(addressUploaded);
  }

  setSuggestAddress(addressComponents: any) {
    let street = '';
    let number = '';
    let postalCode = '';
    let locality = '';
    let province = '';
    addressComponents.forEach((component: any) => {
      if (component.types.includes("route")) {
        street = component.long_name;
        return
      } else if (component.types.includes("street_number")) {
        number = ` ${component.long_name}`;
      } else if (component.types.includes("postal_code")) {
        postalCode = this.country === countryENUM.ARGENTINA ? ` C.P. ${component.long_name.slice(-4)}` : ` CP: ${component.long_name}`;
      } else if (component.types.includes("locality")) {
        locality = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        province = component.long_name;
      }
    });
    this.addressSuggestObj = {
      street: street,
      number: number,
      postalCode: postalCode,
      locality: locality,
      province: province,
    }
    this.streetSuggestFlag = street ? true : false;
    let addressSuggest = street;
    addressSuggest += number ? number : '';
    addressSuggest += postalCode ? `${postalCode}` : '';
    addressSuggest += locality ? `, ${locality}` : '';
    addressSuggest += province ? `, ${province}` : '';
    addressSuggest += this.country ? `, ${this.utilsService.capitalizeText(this.country)}` : '';
    this.addressSuggest.set(addressSuggest);
  }

  selectSuggestAddress() {
    this.uploadedAddressSelected = false;
    this.suggestAddressSelected = true;
  }

  selectUploadedAddress() {
    this.suggestAddressSelected = false;
    this.uploadedAddressSelected = true;
  }

  setAddressPayload() {
    if(this.uploadedAddressSelected) {
      this.addressPayload = {
        addressCodePostal: this.addressInfo.postalCode ? this.addressInfo.postalCode : '',
        addressDepartment: this.addressInfo.apartment ? this.addressInfo.apartment : '',
        addressFloor: this.addressInfo.floor ? this.addressInfo.floor : '',
        addressName: this.addressInfo.street,
        addressNumber: this.addressInfo.number,
        addressType: 'HOME',
        isPrimary: true,
        latitude: this.validationResult.coordinates?.lat ? this.validationResult.coordinates.lat: 0,
        longitude:  this.validationResult.coordinates?.lng ? this.validationResult.coordinates.lng: 0,
        locality: {
          code: this.addressInfo.locality?.code,
          id: this.addressInfo.locality?.id!,
          name: this.addressInfo.locality?.name!,
          tenant: 'UELL',
          state: {
            code: this.addressInfo.locality?.state.code,
            id: this.addressInfo.locality?.state.id!,
            name: this.addressInfo.locality?.state.name!,
            tenant: 'UELL',
          }
        },
        observation: this.addressInfo.observation ? this.addressInfo.observation : '',
        addressValidated: false,
        addressGeometryLocationType: this.validationResult.locationType ? this.validationResult.locationType : '',
        countryCode: ''
      }
    } else {
      //PARTIAL y ROOFTOP -> addressValidated = true
      this.addressPayload = {
        addressCodePostal: this.addressSuggestObj.postalCode ? this.addressSuggestObj.postalCode : '',
        addressDepartment: this.addressInfo.apartment ? this.addressInfo.apartment : '',
        addressFloor: this.addressInfo.floor ? this.addressInfo.floor : '',
        addressName: this.addressSuggestObj.street,
        addressNumber: this.addressSuggestObj.number,
        addressType: 'HOME',
        isPrimary: true,
        latitude: this.validationResult.coordinates?.lat ? this.validationResult.coordinates.lat: 0,
        longitude:  this.validationResult.coordinates?.lng ? this.validationResult.coordinates.lng: 0,
        locality: {
          code: this.addressInfo.locality?.code,
          id: this.addressInfo.locality?.id!,
          name: this.addressInfo.locality?.name!,
          tenant: 'UELL',
          state: {
            code: this.addressInfo.locality?.state.code,
            id: this.addressInfo.locality?.state.id!,
            name: this.addressInfo.locality?.state.name!,
            tenant: 'UELL',
          }
        },
        observation: this.addressInfo.observation ? this.addressInfo.observation : '',
        addressValidated: true,
        addressGeometryLocationType: this.validationResult.locationType ? this.validationResult.locationType : '',
        countryCode: ''
      }
    }
    this.utilsService.modalCtrl.dismiss({ addressPayload: this.addressPayload });
  }

  closeModal() {
    this.utilsService.modalCtrl.dismiss();
  }
}