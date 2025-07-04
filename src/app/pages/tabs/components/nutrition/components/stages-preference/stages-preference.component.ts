import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AnthropometryService } from 'src/app/services/anthropometry.service';
import { StorageService } from 'src/app/services/storage.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swiper from 'swiper';
import { StagesService } from '../services/stages.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IonContent, ModalController } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { StepOnePreferenceComponent } from './components/step-one-preference/step-one-preference.component';

@Component({
  selector: 'app-stages-preference',
  templateUrl: './stages-preference.component.html',
  styleUrls: ['./stages-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, StepOnePreferenceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StagesPreferenceComponent  implements OnInit {
  @ViewChild('swiperEx') swiperEx?: ElementRef<{ swiper: Swiper }>;
  @ViewChild(IonContent) content!: IonContent;

  step: number = 1;
  stepIsValid: boolean = false;
  _stepDescription: string = 'Objetivos'
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  steps: any
  hasAnthropometry: boolean = false;
  combineQuestion: any[] = [];
  stepFeeding: boolean = false;

  anthropometryService = inject(AnthropometryService);
  utilsService = inject(UtilsService)
  stagesService = inject(StagesService)
  storageService = inject(StorageService)
  modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.swiperEx && this.swiperEx.nativeElement.swiper) {
      const swiperInstance = this.swiperEx.nativeElement.swiper;
      swiperInstance.allowTouchMove = false;
      this.swiperSlideChanged();
    }
  }

  swiperSlideChanged() {
    const swiperContainer = document.getElementById('swiperEx');
    if (swiperContainer) {
      swiperContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  nextSlide() {
    if (this.swiperEx && this.swiperEx.nativeElement.swiper) {
      if (this.step === 1) {
        this.anthropometryService.getAnthropometryStatus.subscribe((resp: any) => {
          this.hasAnthropometry = resp
        })
      }

      if (this.step === 5) {
        if( JSON.parse(this.storageService.getSessionStorage('stepFeeding') || 'null')){
          this.stepFeeding = true
        } 
        //this.stepFeeding ? this.openModalCreditPoint(): this.modalServices.presentModal(ModalFeedingComponent, 'modal-training', { preferenceInfo: this.steps },null);
        // this.openModalCreditPoint();
      }

      if (this.step < 5) {
        if (this.step !== 1) {
          this.step++;
          this.swiperEx.nativeElement.swiper.slideNext();
          this.stepIsValid = false

        } else if (this.hasAnthropometry && this.step === 1) {
          this.step++;
          this.swiperEx.nativeElement.swiper.slideNext();
          this.stepIsValid = false

        } else if (!this.hasAnthropometry && this.step === 1) {
          //this.toastServices.presentToast('bottom', 'Se deben cargar los datos de antropometría.')
          this.stepIsValid = true
        }
      }
      this.stepDescription()
    }
  }

  prevSlide() {
    if (this.swiperEx && this.swiperEx.nativeElement.swiper) {
      this.swiperEx.nativeElement.swiper.slidePrev();
      this.stepIsValid = true;
      this.step--;
    }

    this.stepDescription()
  }

  firstStepReturn(event: any, number?: number) {
    if (event !== null) {
      this.stepValues(event, number || 0);
      this.stepIsValid = true
    } else {
      this.stepIsValid = false
    }
  }

  stepDescription() {
    switch (this.step) {
      case 1:
        this._stepDescription = 'Objetivos'
        this.step1 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 2:
        this._stepDescription = 'Preferencias dietarias'
        this.step2 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 3:
        this._stepDescription = 'Patologías'
        this.step3 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 4:
        this._stepDescription = 'Alergias e intolerancias'
        this.step4 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 5:
        this._stepDescription = 'Electrodomésticos'
        this.step5 ? this.stepIsValid = true : this.stepIsValid = false
        break;
    }
  }

  stepValues(value: any, number: number) {
    switch (number) {
      case 1:
        this.step1 = value.firstQuestionStep1;
        break;
      case 2:
        this.step2 = value.firstQuestionStep2
        break;
      case 3:
        this.step3 = value
        break;
      case 4:
        this.step4 = value
        break;
      case 5:
        this.step5 = value
        break;
      default:
        break;
    }
    this.steps = {
      firstQuestionStep1: this.step1,
      firstQuestionStep2: this.step2,
      firstQuestionStep3: this.step3,
      firstQuestionStep4: this.step4,
      firstQuestionStep5: this.step5
    };

    if (this.steps.firstQuestionStep3 && this.steps.firstQuestionStep4?.secondQuestionStep4) {
      this.combineQuestion = [...this.steps.firstQuestionStep3.thirdQuestionStep3, ...this.steps.firstQuestionStep4.secondQuestionStep4]
    }
    if (this.step1 && this.step2 && this.step3 && this.step4 && this.step5) {
      this.steps.firstQuestionStep3.thirdQuestionStep3 = this.combineQuestion
      sessionStorage.setItem('stepPreference', JSON.stringify(this.steps))
    }
  }

}
