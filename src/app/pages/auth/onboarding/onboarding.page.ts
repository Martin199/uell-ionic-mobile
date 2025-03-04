import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IContactInfo } from 'src/app/shared/interface/country-interfaces';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {
  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer!: ElementRef;
  swiper!: Swiper;
  stepIsValid: boolean = true;
  step: number = 0;
  contactInfo: IContactInfo | null = null;
  addressInfo: any | null = null;
  stepUserContactInfo: boolean = false;
  stepUserAddresstInfo: boolean = false;

  ngAfterViewInit(): void {

    this.swiper = this.swiperContainer.nativeElement.swiper;
    if (this.swiper) {
      this.swiper.allowTouchMove = false;
      console.log('Instancia de Swiper:', this.swiper);
    } else {
      console.error('La instancia de Swiper no está disponible.');
    }
  }

  nextSlide(): void {
    if (this.swiperContainer.nativeElement.swiper) {
      this.swiperContainer.nativeElement.swiper.slideNext();
      this.step++;
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
    this.contactInfo = event.data
    this.stepUserContactInfo = event.isValid
  }

  stepsReturnAddressInfo(event: any) {
    this.addressInfo = event.data
    this.stepUserAddresstInfo = event.isValid
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
}
