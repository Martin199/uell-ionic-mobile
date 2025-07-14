import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagesService } from '../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgClass, NgIf } from '@angular/common';
import { StagesFeedingComponent } from '../stages-feeding/stages-feeding.component';
import {  ModalController, Platform } from '@ionic/angular/standalone';
import { StagesPreferenceComponent } from '../stages-preference/stages-preference.component';
import { modalEnterAnimation, modalLeaveAnimation } from 'src/app/shared/animation/animation-modal';

@Component({
  selector: 'app-modal-feeding',
  templateUrl: './modal-feeding.component.html',
  styleUrls: ['./modal-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass, NgIf,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalFeedingComponent  implements OnInit, OnDestroy {

  stepFeeding: boolean = false;
  stepPreference: boolean = false;
  nutritionPlan: any;
  isLoading: boolean = false;
  hasCloseModal: boolean = false;
  planNutrition: any;

  utilsService = inject(UtilsService)
  stagesService = inject(StagesService)
  storageService = inject(StorageService)
  modalCtrl = inject(ModalController)
  platform = inject(Platform)

  private backButtonSubscription: any;

  constructor() { }

  ngOnInit(): void {
    this.checkStep()
    this.setupBackButtonHandler()
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('stepFeeding');
    sessionStorage.removeItem('stepPreference');
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    
    if (!this.hasCloseModal) {
      sessionStorage.removeItem('stepFeeding');
      sessionStorage.removeItem('stepPreference');
    }
  }

  ionViewWillLeave() {
    sessionStorage.removeItem('stepFeeding');
    sessionStorage.removeItem('stepPreference');
  }

  checkStep(){	
    this.planNutrition = this.storageService.getLocalStorage("lastResultdPlan")
    if( this.storageService.getSessionStorage('stepFeeding')){
      this.stepFeeding = true
    } else {
      this.stepFeeding = false
    }

    if(this.storageService.getSessionStorage('stepPreference')){
      this.stepPreference = true
    } else {
      this.stepPreference = false
    }

    if (this.stepPreference && this.stepFeeding) {
      this.hasCloseModal = true
    } else {
      this.hasCloseModal = false
    }
    
  }

  async goTo(url: string){
    
    try {
      const modal = await this.modalCtrl.create({
        component: StagesFeedingComponent,
        showBackdrop: true,
        backdropDismiss: false,
        enterAnimation: modalEnterAnimation,
        leaveAnimation: modalLeaveAnimation,
      });
      
      await modal.present();
      
      const { data } = await modal.onDidDismiss();
      
      if (data && data.completed) {
        this.onStagesFeedingCompleted(data.data);
      } 
    } catch (error) {
      console.error('Error al abrir el modal:', error);
    }
  }

  onStagesFeedingCompleted(feedingData: any) {
    
    this.stepFeeding = true;
    
    if (this.stepPreference && this.stepFeeding) {
      this.hasCloseModal = true;
    }
    
  }

  async goToPreference(url: string) {
    
    try {
      const modal = await this.modalCtrl.create({
        component: StagesPreferenceComponent,
        showBackdrop: true,
        backdropDismiss: false
      });
      
      await modal.present().then(() => {
        modal.onDidDismiss().then((data) => {
          if (data && data.data && data.data.completed) {
            this.checkStep()
            this.openModalCreditPoint()
          }
        });
      });
      
  
    } catch (error) {
      console.error('Error al abrir el modal:', error);
    }  }

  onStepPreferenceCompleted(preferenceData: any) {
    this.stepPreference = true;
    if (this.stepPreference && this.stepFeeding) {
      this.hasCloseModal = true;
    }
  }

  openModalCreditPoint(){
    this.utilsService.presentWinToast(3)
  }

  postPlan(){
    this.isLoading = true
    this.stagesService.postNutritionPlan(this.storageService.getSessionStorage('stepFeeding'), this.storageService.getSessionStorage('stepPreference')).subscribe((resp: any)=> {
      this.isLoading = false
      this.nutritionPlan = resp
      sessionStorage.setItem('resultNutrition', JSON.stringify(resp));
      this.utilsService.goTo('/tabs/nutrition/my-results')
      this.modalCtrl.dismiss()
      sessionStorage.removeItem('stepFeeding');
      sessionStorage.removeItem('stepPreference');
    }, (error: any) => {
      this.isLoading = false
      if (error.status === 400 && error.error.message === "You cannot upload a new questionnaire, since you have one created in the last 45 days") {
        this.utilsService.getToastMessage('bottom', 3000, 'No puedes subir un nuevo cuestionario, ya que tienes uno creado en los últimos 45 días')
      } else {
        this.utilsService.getToastMessage('bottom', 3000, 'Error al obtener el plan de nutrición')
      }
    })
  }

  setupBackButtonHandler() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  handleBackButton() {
    this.modalCtrl.dismiss();
  }

}
