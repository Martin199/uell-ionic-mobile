import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { GeneralInformationQuestionaryComponent } from './steps/general-information-questionary/general-information-questionary.component';
import { InitialClinicalData, MedicalHistoryDiseases, MedicalHistoryDiseasesClass } from '../../interfaces';
import { UnderlyingDiseasesQuestionaryComponent } from './steps/underlying-diseases-questionary/underlying-diseases-questionary.component';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ServerErrorModalComponent } from 'src/app/src/app/pages/auth/onboarding/components/modals/server-error-modal/server-error-modal.component';
import { UtilsService } from 'src/app/services/utils.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { time } from 'ionicons/icons';

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
  private utils = inject(UtilsService);
  private userStateService = inject(UserStateService);
  private initialClinicalData = signal<InitialClinicalData>({
    takesMedication: false,
    hadJobAccidents: false,
    hadJobSickness: false,
    hadPreviousJobs: false,
    hadVaccines: false,
  });
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

  async onGeneralInformationResponse(event: InitialClinicalData) {
    // Post the completeness medical information
    this.initialClinicalData.set(event);
    const loading = await this.utils.loading();
    // await loading.present();
    this.userService.postCompletenessMedicalInformation(this.initialClinicalData()).subscribe({
      next: () => {
        // loading.dismiss();
        this.progress.set(1);
        this.nextSlide();
      },
      error: error => {
        // loading.dismiss();
        if (error.status === 409 || error.status === 500) {
          this.utils.presentModal(ServerErrorModalComponent);
        }
        console.error('Error posting completeness medical information:', error);
      },
    });
  }

  async onUnderlyingDiseasesResponse(event: MedicalHistoryDiseasesClass) {
    const loading = await this.utils.loading();
    // await loading.present();
    const medicalHistoryDiseases: MedicalHistoryDiseases = {
      medicalHistoryDiseases: event,
    };

    this.userService.postMedicalDiseases(medicalHistoryDiseases).subscribe({
      next: () => {
        // loading.dismiss();
        const activeModules = this.userStateService.tenantParameters()?.activeModules;
        if (activeModules?.includes('isps')) {
          this.utils.navigateTo('/auth/onboarding/wellness-onboarding');
          // this.nextSlide();
        } else {
          this.postOnboarding();
        }
      },
      error: error => {
        // loading.dismiss();
        if (error.status === 409 || error.status === 500) {
          this.utils.presentModal(ServerErrorModalComponent);
        }
        console.error('Error posting medical diseases:', error);
      },
    });
  }

  public async postOnboarding() {
    const body = {onboarded: true};
    this.userService.postOnBoarding(body).subscribe(() => {
        this.utils.navigateTo('/tabs/home');
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
