import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { MoodEnergyWellbeingComponent } from './steps/mood-energy-wellbeing/mood-energy-wellbeing.component';
import { EnergyConcentrationComponent } from './steps/energy-concentration/energy-concentration.component';
import { NutritionLifestyleComponent } from './steps/nutrition-lifestyle/nutrition-lifestyle.component';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  PostWellnessContent,
  MoodEnergyWellbeingPostData,
  EnergyConcentrationPostData,
  NutritionLifestylePostData,
} from 'src/app/services/interfaces/auth-service.interfaces';

@Component({
  selector: 'app-wellness-onboarding',
  templateUrl: './wellness-onboarding.component.html',
  styleUrls: ['./wellness-onboarding.component.scss'],
  imports: [
    IonProgressBar,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonHeader,
    MoodEnergyWellbeingComponent,
    EnergyConcentrationComponent,
    NutritionLifestyleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WellnessOnboardingComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<{ swiper: Swiper }>;
  progress = signal(0.33);

  private router = inject(Router);
  private authService = inject(AuthService);

  private postWellnessData: Partial<PostWellnessContent> = {};

  ngAfterViewInit() {
    if (this.swiperContainer.nativeElement) {
      const swiperOptions: SwiperOptions = {
        allowTouchMove: false,
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        loop: false,
      };

      const swiperElementConstructor = this.swiperContainer.nativeElement as any;
      Object.assign(swiperElementConstructor, swiperOptions);
      swiperElementConstructor.initialize();
    }
  }

  nextSlide() {
    this.swiperContainer.nativeElement.swiper.slideNext();
  }

  prevSlide() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
  }

  onMoodEnergyWellbeingResponse(event: MoodEnergyWellbeingPostData) {
    this.postWellnessData = { ...this.postWellnessData, ...event };
    this.progress.set(0.66);
    this.nextSlide();
  }

  onEnergyConcentrationResponse(event: EnergyConcentrationPostData) {
    this.postWellnessData = { ...this.postWellnessData, ...event };
    this.progress.set(1);
    this.nextSlide();
  }

  onNutritionLifestyleResponse(event: NutritionLifestylePostData) {
    this.postWellnessData = { ...this.postWellnessData, ...event };

    const completeWellnessData: PostWellnessContent = {
      ...(this.postWellnessData as PostWellnessContent),
      onboarded: true,
    };

    this.authService.postWellnessContent(completeWellnessData).subscribe({
      next: () => {
        this.router.navigate(['/tabs/home']);
      },
      error: (error: any) => {
        console.error('Error posting wellness content:', error);
      },
    });
  }

  onClickBack() {
    if (this.progress() === 1) {
      this.prevSlide();
      this.progress.set(0.66);
    } else if (this.progress() === 0.66) {
      this.prevSlide();
      this.progress.set(0.33);
    } else {
      this.router.navigate(['/auth/onboarding/clinical-history']);
    }
  }
}
