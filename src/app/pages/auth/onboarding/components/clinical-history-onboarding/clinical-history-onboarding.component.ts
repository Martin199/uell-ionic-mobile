import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { GeneralInformationQuestionaryComponent } from './steps/general-information-questionary/general-information-questionary.component';
import { InitialClinicalData, MedicalHistoryDiseases, MedicalHistoryDiseasesClass } from '../../interfaces';
import { UnderlyingDiseasesQuestionaryComponent } from './steps/underlying-diseases-questionary/underlying-diseases-questionary.component';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clinical-history-onboarding',
  templateUrl: './clinical-history-onboarding.component.html',
  styleUrls: ['./clinical-history-onboarding.component.scss'],
  imports: [
    IonProgressBar,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonHeader,
    GeneralInformationQuestionaryComponent,
    UnderlyingDiseasesQuestionaryComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClinicalHistoryOnboardingComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<{ swiper: Swiper }>;
  progress = signal(0.5);

  private router = inject(Router);
  private userService = inject(UserService);
  ngAfterViewInit() {
    if (this.swiperContainer.nativeElement) {
      const swiperOptions: SwiperOptions = {
        allowTouchMove: false,
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        loop: false,
        // speed: 300,

        // preventInteractionOnTransition: true,
        // allowSlideNext: false,
        // allowSlidePrev: false,
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

  onGeneralInformationResponse(event: InitialClinicalData) {
    // Post the completeness medical information
    this.userService.postCompletenessMedicalInformation(event).subscribe({
      next: () => {
        this.progress.set(1);
        this.nextSlide();
      },
      error: error => {
        console.error('Error posting completeness medical information:', error);
      },
    });
  }

  onUnderlyingDiseasesResponse(event: MedicalHistoryDiseasesClass) {
    const medicalHistoryDiseases: MedicalHistoryDiseases = {
      medicalHistoryDiseases: event,
    };

    this.userService.postMedicalDiseases(medicalHistoryDiseases).subscribe({
      next: () => {
        this.router.navigate(['/auth/onboarding']);
      },
      error: error => {
        console.error('Error posting medical diseases:', error);
      },
    });
  }

  onClickBack() {
    if (this.progress() === 1) {
      this.prevSlide();
      this.progress.set(0.5);
    } else {
      this.router.navigate(['/auth/onboarding']);
    }
  }
}
