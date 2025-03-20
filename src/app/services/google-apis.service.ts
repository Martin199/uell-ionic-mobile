import { inject, Injectable } from '@angular/core';
import { IAddressValidationResult } from './interfaces/google-apis.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { ModalSuggestAddressComponent } from '../shared/componentes/modal-suggest-address/modal-suggest-address.component';
import { StorageService } from './storage.service';
import { IAddressInfo } from '../shared/interface/country-interfaces';
import { TenantParametersResponse } from '../core/interfaces/tenantParameters';
import { countryENUM } from '../shared/constant/country-constants';
import { UtilsService } from './utils.service';
import { AdressResponse } from '../pages/auth/onboarding/steps/user-address-info/interfaces/address-info.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleApisService {

  private http = inject(HttpClient);
  private modalCtrl = inject(ModalController);
  storageService = inject(StorageService);
  utilsService = inject(UtilsService);
  
  private apiKey = environment.googleMapsApiKey;
  addressSuggest: string = '';
  addressUploaded: string = '';
  validationResult: any;
  tenantParameters: TenantParametersResponse | null = null;
  country: countryENUM = countryENUM.OTHER;
  addressPayload: AdressResponse | null = null;

  constructor() {}

  getAddressPayload() {
    return this.addressPayload;
  }

  pushIdAddress(id: any) {
    this.addressPayload!.id = id;
  }

  async validacionGoogleMaps(addressInfo: IAddressInfo) {
    const formattedStreet: string = this.formatAddress(addressInfo);
    this.validationResult = await this.validateAndSuggestAddress(formattedStreet);
    const confirmAddress = await this.openSuggestAddressModal(addressInfo);
    if (confirmAddress) {
      return true;
    } else {
      return false;
    }
  }

  async openSuggestAddressModal(addresInfo: IAddressInfo) {
    const modal = await this.modalCtrl.create({
      component: ModalSuggestAddressComponent,
      componentProps: {
        validationResult: this.validationResult,
        addressInfo: addresInfo,
       }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.addressPayload) {
      this.addressPayload = data.addressPayload;
      return true;
    } else {
      return false;
    }
  }

  async validateAndSuggestAddress(address: string): Promise<IAddressValidationResult> {

    //* url sin proxy para producción y ambientes bajos:
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    //* url con proxy para probar en local:
    /* Configuracion en el angular.json:
      "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
          "proxyConfig": "src/proxy.conf.json"
        },
    */
    // const url = `/maps-api/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    try {
      const response: any = await this.http.get(url).toPromise();

      if (response.status === 'OK') {
        const result = response.results[0];
        return {
          isValid: true,
          userAddress: address,
          suggestedAddress: result.formatted_address,
          locationType: result.geometry.location_type,
          coordinates: result.geometry.location,
          addressComponents: result.address_components,
          message: 'Dirección válida',
        };
      } else if (response.status === 'ZERO_RESULTS') {
        return {
          isValid: false,
          userAddress: address,
          message: 'Dirección no encontrada',
        };
      } else {
        return {
          isValid: false,
          userAddress: address,
          message: `Error en la solicitud: ${response.status}`,
        };
      }
    } catch (error) {
      return {
        isValid: false,
        userAddress: address,
        message: 'Error al validar la dirección',
      };
    }
  }

  formatAddress(address: IAddressInfo): string {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    const countryEnum = this.utilsService.findCountryEnum(this.tenantParameters!.tenantParameters?.country
      ? this.tenantParameters!.tenantParameters.country
      : countryENUM.ARGENTINA);
    this.country = countryEnum;
    const { street, number, floor, apartment, postalCode, province, locality } = address;
    if (!street || !province || !locality) {
      throw new Error("Street, province, and locality are required fields.");
    }
    let formattedAddress = street;
    if (number) {
      formattedAddress += ` ${number}`;
    }
    if (postalCode) {
      formattedAddress += `, CP: ${postalCode}`;
    }
    formattedAddress += `, ${this.utilsService.capitalizeText(locality.name)}, ${this.utilsService.capitalizeText(province.name)}, ${this.utilsService.capitalizeText(this.country)}`;
    return formattedAddress;
  }

}
