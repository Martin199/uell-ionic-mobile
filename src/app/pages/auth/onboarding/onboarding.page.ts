import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';

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
      // if (this.step === 2) {
      //   this.stepIsValid = false;
      // }
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

  stepsReturnInfo(stepNumber: number): void {
    console.log('Información del paso:', stepNumber);
  }

}
