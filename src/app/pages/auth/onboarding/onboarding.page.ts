import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  swiper?: Swiper;

  ngAfterViewInit() {
    const swiperOptions: SwiperOptions = {
      allowTouchMove: false,
      // otras opciones...
    };

    this.swiper = new Swiper(this.swiperContainer.nativeElement, swiperOptions);
  }

  nextSlide() {
    this.swiper?.slideNext();
  }

  prevSlide() {
    this.swiper?.slidePrev();
  }
}
