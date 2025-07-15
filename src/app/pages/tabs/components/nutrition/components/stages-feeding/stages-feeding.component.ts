import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swiper from 'swiper';
import { StagesService } from '../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { StepOneFeedingComponent } from './components/step-one-feeding/step-one-feeding.component';
import { IonContent, ModalController } from '@ionic/angular/standalone';
import { StepTwoFeedingComponent } from './components/step-two-feeding/step-two-feeding.component';
import { StepThreeFeedingComponent } from './components/step-three-feeding/step-three-feeding.component';
import { StepFourFeedingComponent } from './components/step-four-feeding/step-four-feeding.component';
import { StepFiveFeedingComponent } from './components/step-five-feeding/step-five-feeding.component';
import { StepSixFeedingComponent } from './components/step-six-feeding/step-six-feeding.component';
import { StepSevenFeedingComponent } from './components/step-seven-feeding/step-seven-feeding.component';
import { StepEightFeedingComponent } from './components/step-eight-feeding/step-eight-feeding.component';
import { StepNineFeedingComponent } from './components/step-nine-feeding/step-nine-feeding.component';
import { StepTenFeedingComponent } from './components/step-ten-feeding/step-ten-feeding.component';

@Component({
  selector: 'app-stages-feeding',
  templateUrl: './stages-feeding.component.html',
  styleUrls: ['./stages-feeding.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, NgIf ,StepOneFeedingComponent, StepTwoFeedingComponent, StepThreeFeedingComponent, StepFourFeedingComponent, StepFiveFeedingComponent, StepSixFeedingComponent, StepSevenFeedingComponent,StepEightFeedingComponent, StepNineFeedingComponent, StepTenFeedingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StagesFeedingComponent  implements OnInit, AfterViewInit {
  @ViewChild('swiperEx') swiperEx?: ElementRef<{ swiper: Swiper }>;
  @ViewChild(IonContent) content!: IonContent;

  step: number = 1;
  stepIsValid: boolean = false;
  step1!: {};
  step2!: {};
  step3!: {};
  step4!: {};
  step5!: {};
  step6!: {};
  step7!: {};
  step8!: {};
  step9!: {};
  step10!: {};
  finalObj: any;
  _stepDescription: string = 'Hidratación'
  stepPreference: boolean = false;

  utilsService = inject(UtilsService)
  stagesService = inject(StagesService)
  storageService = inject(StorageService)
  modalCtrl = inject(ModalController)
  constructor() { }

  // Método de prueba para cerrar el modal manualmente
  testCloseModal() {
    this.modalCtrl.dismiss({ completed: true, data: { test: 'data' } });
  }

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

  ngOnInit() {}

  scrollToTop() {
    //this.content.scrollToTop(0);
  }

  nextSlide() {
    if (this.swiperEx && this.swiperEx.nativeElement.swiper) {

      if (this.step === 10) {
        this.modalCtrl.dismiss({ completed: true, data: this.finalObj });
        if( JSON.parse(this.storageService.getSessionStorage('stepPreference') || 'null')){
          this.stepPreference = true
         
    } 
        
        //this.stepPreference ? this.openModalCreditPoint() : this.modalServices.presentModal(ModalFeedingComponent, 'modal-training',{ feddingInfo: this.finalObj },null).then(() => { });

      }
      
      if (this.step < 10) {
        this.step++;
        this.swiperEx.nativeElement.swiper.slideNext();
      }

      this.stepIsValid = false
      this.stepDescription()
    }
  }

  prevSlide() {
    if (this.swiperEx && this.swiperEx.nativeElement.swiper) {
      this.swiperEx.nativeElement.swiper.slidePrev();
      this.stepIsValid = true;
      this.step--;
      this.stepDescription();
    }
  }

  firstStepReturn(event: any, number: number) {
    
    if (event !== null) {
      this.stepValues(event, number);
      this.stepIsValid = true
    } else {
      this.stepIsValid = false
    }
  }


  stepDescription() {
    switch (this.step) {
      case 1:
        this._stepDescription = 'Hidratación';
        this.step1 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 2:
        this._stepDescription = 'Verduras'
        this.step2 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 3:
        this._stepDescription = 'Frutas'
        this.step3 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 4:
        this._stepDescription = 'Cereales, tubérculos y menestras';
        this.step4 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 5:
        this._stepDescription = 'Sal'
        this.step5 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 6:
        this._stepDescription = 'Azúcar'
        this.step6 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 7:
        this._stepDescription = 'Carnes'
        this.step7 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 8:
        this._stepDescription = 'Lácteos y huevos'
        this.step8 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 9:
        this._stepDescription = 'Ultraprocesados'
        this.step9 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      case 10:
        this._stepDescription = 'Preparación de alimentos'
        this.step10 ? this.stepIsValid = true : this.stepIsValid = false
        break;
      default:
        break;
    }
  }

  stepValues(value: any, number: number) {
    
    switch (number) {
      case 1:
        this.step1 = value
        break;
      case 2:
        this.step2 = value
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
      case 6:
        this.step6 = value
        break;
      case 7:
        this.step7 = value
        break;
      case 8:
        this.step8 = value
        break;
      case 9:
        this.step9 = value
        break;
      case 10:
        this.step10 = value
        break;
      default:
        break;
    }


    this.finalObj = Object.assign({}, this.step1, this.step2, this.step3, this.step4, this.step5, this.step6, this.step7, this.step8, this.step9, this.step10);

    if (this.step1 && this.step2 && this.step3 && this.step4 && this.step5 &&
      this.step6 && this.step7 && this.step8 && this.step9 && this.step10) {
     sessionStorage.setItem('stepFeeding', JSON.stringify(this.finalObj))
     //this.modalCtrl.dismiss({ completed: true, data: this.finalObj });

    }

    
  }

}
