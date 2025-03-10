import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IAddressInfo, IContactInfo } from 'src/app/shared/interface/country-interfaces';
import { GoogleApisService } from 'src/app/services/google-apis.service';
import { StorageService } from 'src/app/services/storage.service';
import { AdressResponse } from './steps/user-address-info/interfaces/address-info.interface';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {

  private googleApisService = inject(GoogleApisService);
  storageService = inject (StorageService);

  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer!: ElementRef;
  swiper!: Swiper;
  stepIsValid: boolean = true;
  step: number = 0;
  contactInfo: IContactInfo | null = null;
  addressInfo: any | null = null;
  stepUserContactInfo: boolean = false;
  stepUserAddresstInfo: boolean = false;
  tenantParameters : any;
  country: string = '';
  adressRespons!: AdressResponse;

  ngAfterViewInit(): void {

    this.swiper = this.swiperContainer.nativeElement.swiper;
    if (this.swiper) {
      this.swiper.allowTouchMove = false;
    } else {
      console.error('La instancia de Swiper no está disponible.');
    }
  }

  async nextSlide() {
    if (this.swiperContainer.nativeElement.swiper) {
      if (this.step === 3) {
        const confirmAddress: any = await this.validacionGoogleMaps(this.addressInfo);
        if (confirmAddress) {
          this.swiperContainer.nativeElement.swiper.slideNext();
          this.step++;
        }
      } else {
        this.swiperContainer.nativeElement.swiper.slideNext();
        this.step++;
      }
    }
  }

  prevSlide(): void {
    if (this.swiperContainer.nativeElement.swiper) {
      this.swiperContainer.nativeElement.swiper.slidePrev();
      this.step--;
      if (this.step < 2) {
        this.stepIsValid = true;
      }
    }
  }

  stepsReturnContactInfo(event: any) {
    this.contactInfo = event.data;
    this.stepUserContactInfo = event.isValid;
  }

  stepsReturnAddressInfo(event: any) {
    this.addressInfo = event.data;
    this.stepUserAddresstInfo = event.isValid;
  }

  validacionGoogleMaps(addressInfo: IAddressInfo) {
    // const address = this.formatAddress(addressInfo);
    return this.googleApisService.validacionGoogleMaps(addressInfo);
  }

  disabledNextButton(): boolean {
    if (this.step === 2) {
      return !this.stepUserContactInfo;
    }
    if (this.step === 3) {
      return !this.stepUserAddresstInfo
    }
    return false;
  }

  // private buildPostResquest(): OnBoardingRequest {
	// 	this.adressList = [];
	// 	this.adressList.push(this.adressResponse);
	// 	const onBoardingRequest = new OnBoardingRequest();

	// 	onBoardingRequest.bornDate = this.dataPersonal.fechaDeNacimento;
	// 	onBoardingRequest.email = this.personalFormResponse.email;
	// 	onBoardingRequest.emailCorporate = this.personalFormResponse.email;
	// 	onBoardingRequest.photo = this.file.length > 0 ? this.file[0] : null;
	// 	this.photo = this.file.length > 0 ? this.file[0] : null;
	// 	onBoardingRequest.telephoneNumber = this.personalFormResponse.phone;
	// 	onBoardingRequest.cellphoneNumber = this.personalFormResponse.phone;
	// 	onBoardingRequest.maritalStatus = this.dataPersonal.estadoCivil;
	// 	if (this.skipAd === false){
	// 		onBoardingRequest.address = this.adressList;
	// 	}else{
	// 		this.skipAd = false;
	// 	}
	// 	onBoardingRequest.onboarded = true;
	// 	// TODO: por definir
	// 	// onBoardingRequest.medicalInformation = this.medicalInformation;
	// 	return onBoardingRequest;
	// }
}
