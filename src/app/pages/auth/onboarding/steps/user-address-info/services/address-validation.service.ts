import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AdressResponse } from '../interfaces/address-info.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressValidationService {

//   stepProcessing: boolean = false;
//   country!: string ;
//   public adressResponse: any;
//   public providedAddress: any;
//   locationType : string = ''
//   public providedPostalCode: any;
  

//   constructor(private flcPipe: TitleCasePipe,
//               private storageService: StorageService,
//               private http: HttpClientService
//   ) { }

//   public GoogleMapsValidation(address: AdressResponse): Observable<any> {
// 		const tenantData = JSON.parse(this.storageService.getSessionStorage('tenantParameters')!);
// 		const country = tenantData.country;
// 		address.addressNumber = this.checkCharacters(address.addressNumber!);
// 		address.addressName = this.checkCharacters(address.addressName);
// 		const key = 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk';
// 		const url = country === 'ECUADOR' ? `https://maps.googleapis.com/maps/api/geocode/json?address=` +
// 		`${address.addressName} ` +
// 		`${address.locality.name} ${address.locality.state.name} ` +
// 		`${country} ${address.addressCodePostal}` +
// 		`&key=${key}&sensor=false`
// 		:
// 		`https://maps.googleapis.com/maps/api/geocode/json?address=` +
// 			`${address.addressName} ${address.addressNumber} ` +
// 			`${address.locality.name} ` +
// 			`${this.getCPLetter(address.locality.state.code)}${address.addressCodePostal}` +
// 			` ${address.locality.state.name} ${country}` +
// 			`&key=${key}&sensor=false`;
// 		return this.http.get<any>(url).pipe();
// 	}

//   getCPLetter(codeState: string) {
//     let prefix = null;
//     switch (codeState) {
//       case 'SAL':
//         prefix = 'A';
//         break;
//       case 'BAI':
//         prefix = 'B';
//         break;
//       case 'CFE':
//         prefix = 'C';
//         break;
//       case 'SLU':
//         prefix = 'D';
//         break;
//       case 'ERI':
//         prefix = 'E';
//         break;
//       case 'LRI':
//         prefix = 'F';
//         break;
//       case 'SDE':
//         prefix = 'G';
//         break;
//       case 'CHA':
//         prefix = 'H';
//         break;
//       case 'SJU':
//         prefix = 'J';
//         break;
//       case 'CAT':
//         prefix = 'K';
//         break;
//       case 'LPA':
//         prefix = 'L';
//         break;
//       case 'MEN':
//         prefix = 'M';
//         break;
//       case 'MIS':
//         prefix = 'N';
//         break;
//       case 'FOR':
//         prefix = 'P';
//         break;
//       case 'NEU':
//         prefix = 'Q';
//         break;
//       case 'RNE':
//         prefix = 'R';
//         break;
//       case 'SFE':
//         prefix = 'S';
//         break;
//       case 'TUC':
//         prefix = 'T';
//         break;
//       case 'CHU':
//         prefix = 'U';
//         break;
//       case 'FUE':
//         prefix = 'V';
//         break;
//       case 'TDF':
//         prefix = 'V';
//         break;
//       case 'COR':
//         prefix = 'W';
//         break;
//       case 'CBA':
//         prefix = 'X';
//         break;
//       case 'JUJ':
//         prefix = 'Y';
//         break;
//       case 'SCR':
//         prefix = 'Z';
//         break;
//       default:
//         break;
//     }
//     return prefix;
//   }


//   public validGoogleMaps() {
// 		// if (sessionStorage.getItem('currentTenant') === 'ferreycorp'){
// 		// 	this.addressContinue();
// 		// 	return;
// 		// }
// 		window.scroll(0, 0);
// 		this.stepProcessing = true;
// 		// console.log(this.adressResponse)
// 		// debugger
// 		this.GoogleMapsValidation(this.adressResponse).subscribe(
// 			(res: any) => {
// 				if (res.status === 'OK') {
// 					let route: string;
// 					let postalCode: string;
// 					let country: string;
// 					let locality: string;
// 					let state: string;
// 					let addressNumber: string;
// 					let liteTxtAddress: string;
// 					const location_type: string =
// 						res.results[0].geometry.location_type;
// 					res.results[0].address_components.forEach(
// 						(address: any) => {
// 							if (this.country === 'ECUADOR') {
// 								route = res.results[0].formatted_address.split(',')[0].trim();
// 							} else {
// 								if (address.types[0] === 'route') {
// 									route = address.long_name;
// 								}
// 							}
// 							if (address.types[0] === 'street_number') {
// 								addressNumber = address.long_name;
// 							  }
// 							if (address.types[0] === 'postal_code') {
// 								if (this.country === 'ARGENTINA'){
// 									postalCode = address.long_name.slice(-4);
// 								}else{
// 									postalCode = address.long_name;
// 								}
// 							}
// 							if (address.types[0] === 'locality') {
// 								locality = address.long_name;
// 							  }
// 							if (address.types[0] === 'administrative_area_level_1') {
// 								state = address.long_name;
// 							  }
// 							if (address.types[0] === 'country') {
// 								country = address.long_name;
// 							  }
// 						}
// 					);
// 					// para todos los casos de prueba realizados estos campos siempre vienen si res.status === 'OK'
// 					this.adressResponse.latitude =
// 						res.results[0].geometry.location.lat;
// 					this.adressResponse.longitude =
// 						res.results[0].geometry.location.lng;
// 					this.adressResponse.addressGeometryLocationType =
// 						location_type;

// 					if (this.adressResponse.addressName.includes('%23')){
// 							this.adressResponse.addressName = this.checkCharacters(this.adressResponse.addressName);
// 						}
// 					const resp = this.adressResponse;
// 					this.providedAddress = `${resp.addressName} ${resp.addressNumber}, C.P. ${resp.addressCodePostal},` + 
// 					`${this.flcPipe.transform(resp.locality.name)}, ${resp.locality.state.name}, ${this.flcPipe.transform(this.country)}`;
// 					liteTxtAddress = `${route} ${addressNumber} C.P. ${postalCode}, ${locality}, ${state}, ${country}`;
// 					if (location_type === 'ROOFTOP') {
// 						this.adressResponse.addressValidated = true;
// 						this.stepProcessing = false;
// 						if (
// 							resp.addressName === res.results[0].address_components[1].long_name &&
// 							resp.addressNumber === res.results[0].address_components[0].long_name &&
// 							this.checkPostalCode(res.results[0].address_components, resp.addressCodePostal)
// 						) {
// 							this.locationType = 'ROOFTOP_FULL';
// 						} else {
// 							this.locationType = 'PARTIAL';
// 						}
// 						this.resolveAddress(
// 							liteTxtAddress,
// 							this.adressResponse,
// 							route,
// 							postalCode,
// 							addressNumber
// 						);
// 					} else if (location_type === 'RANGE_INTERPOLATED') {
// 						this.locationType = 'PARTIAL';
// 						this.adressResponse.addressValidated = true;
// 						this.stepProcessing = false;
// 						this.resolveAddress(
// 							liteTxtAddress,
// 							this.adressResponse,
// 							route,
// 							postalCode,
// 							addressNumber
// 						);
// 					} else if (location_type === 'APPROXIMATE' || location_type === 'GEOMETRIC_CENTER') {
// 						this.locationType = 'APPROXIMATE';
// 						this.adressResponse.addressValidated = false;
// 						this.resolveAddress(
// 							liteTxtAddress,
// 							this.adressResponse,
// 							route,
// 							postalCode,
// 							addressNumber
// 						);
// 					 this.stepProcessing = false;
// 				} else {
// 					this.adressResponse.addressValidated = false;
// 					this.adressResponse.addressGeometryLocationType =
// 						'notOKStatus';
// 					this.adressResponse.latitude = 0;
// 					this.adressResponse.longitude = 0;
// 					this.stepProcessing = false;
// 					this.locationType = 'APPROXIMATE';
// 				}
// 				}
// 			},
// 			(error) => {
// 				// si falla api google de todas maneras se puede continuar
// 				this.adressResponse.addressValidated = false;
// 				this.adressResponse.addressGeometryLocationType =
// 					'googleGeocodeERROR';
// 				this.adressResponse.latitude = 0;
// 				this.adressResponse.longitude = 0;
// 				console.error(error);
// 				this.locationType = 'APPROXIMATE';
// 				this.adressResponse.addressValidated = false;
// 			}
// 		);
// 	}

//   private resolveAddress(
// 		formattedAddress: string,
// 		adrress: AdressResponse,
// 		route: string,
// 		postalCode: string,
// 		addressNumber?: string
// 	) {
// 		window.scroll(0, 0);
// 		const modalOpts: object = this.generalService.setModalOptions('lg');
// 		const modalRef = this.modalService.open(ModalComponent, modalOpts);
// 		switch (this.locationType) {
// 			case 'ROOFTOP_FULL':
// 				modalRef.componentInstance.type = 'ROOFTOP_FULL';
// 				modalRef.componentInstance.providedAddress = this.providedAddress;
// 				break;
// 			case 'PARTIAL':
// 				modalRef.componentInstance.type = 'PARTIAL';
// 				modalRef.componentInstance.formattedAddress = formattedAddress;
// 				modalRef.componentInstance.providedAddress = this.providedAddress;
// 				break;
// 			case 'APPROXIMATE':
// 			default:
// 				modalRef.componentInstance.type = 'INVALID_ADDRESS';
// 				modalRef.componentInstance.providedAddress = this.providedAddress;
// 				break;
// 		}
// 		modalRef.result
// 			.then((result: IModalActions) => {
// 				this.providedPostalCode = this.adressResponse.addressCodePostal;
// 				this.providedRoute = this.adressResponse.addressName;
// 				if (result.oKAction1) {
// 					if (result.data === 'sugerida') {
// 						if (route) {
// 							this.adressResponse.addressName = route;
// 						}
// 						if (postalCode) {
// 							this.adressResponse.addressCodePostal = postalCode;
// 						}
// 						if (addressNumber) {
// 							this.adressResponse.addressNumber = addressNumber;
// 						}
// 					}
// 					if ((result.data === 'ingresada' || !result.data) && this.locationType !== 'ROOFTOP_FULL') {
// 						this.adressResponse.latitude = 0;
// 						this.adressResponse.longitude = 0;
// 					}
// 					this.addressContinue();
// 				}
// 				if (result.oKAction2) {
// 					if (route) {
// 						adrress.addressName = route;
// 					}
// 					if (postalCode) {
// 						adrress.addressCodePostal = postalCode;
// 					}
// 					this.addressContinue();
// 				}
// 				if (result.oKAction3) {
// 					this.adressResponse.latitude = 0;
// 					this.adressResponse.longitude = 0;
// 					this.addressContinue();
// 				}
// 				this.disabled = true;
// 			})
// 			.catch((e) => console.error('e: ', e));
// 	}

//   checkCharacters(addressFile: string){
// 		if (addressFile){
// 			return	addressFile.replace('%23', '#');
// 		}
// 		return	addressFile;
// 	}

//   checkPostalCode(addressComponents: any, postalCode: string): boolean {
// 		return addressComponents.some(
// 			(component: any) => component.types[0] === 'postal_code' && component.long_name.includes(postalCode)
// 		);
// 	}
}
