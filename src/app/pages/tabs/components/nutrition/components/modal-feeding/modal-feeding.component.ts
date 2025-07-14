import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagesService } from '../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgClass } from '@angular/common';
import { StagesFeedingComponent } from '../stages-feeding/stages-feeding.component';
import {  ModalController, Platform } from '@ionic/angular/standalone';
import { StagesPreferenceComponent } from '../stages-preference/stages-preference.component';

@Component({
  selector: 'app-modal-feeding',
  templateUrl: './modal-feeding.component.html',
  styleUrls: ['./modal-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
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
    console.log('ModalFeedingComponent se está destruyendo');
    sessionStorage.removeItem('stepFeeding');
    sessionStorage.removeItem('stepPreference');
    // Limpiar suscripción del botón de retroceso
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    
    // Opcional: Limpiar sessionStorage si el modal se cierra sin completar
    if (!this.hasCloseModal) {
      console.log('Modal cerrado sin completar - limpiando datos');
      sessionStorage.removeItem('stepFeeding');
      sessionStorage.removeItem('stepPreference');
    }
  }

  ionViewWillLeave() {
    console.log('ModalFeedingComponent está por salir');
    // Este método se ejecuta cuando el modal está por cerrarse
    // Puedes usar esto para detectar el cierre del modal específicamente
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
    console.log('Iniciando goTo...');
    
    try {
      const modal = await this.modalCtrl.create({
        component: StagesFeedingComponent,
        showBackdrop: true,
        backdropDismiss: false
      });
      
      await modal.present();
      
      const { data } = await modal.onDidDismiss();
      console.log('Modal cerrado con datos:', data);
      
      // Verificar si el modal se cerró con datos de completado
      if (data && data.completed) {
        console.log('StagesFeeding completado:', data.data);
        this.onStagesFeedingCompleted(data.data);
      } else {
        console.log('Modal cerrado sin datos de completado');
      }
    } catch (error) {
      console.error('Error al abrir el modal:', error);
    }
  }

  onStagesFeedingCompleted(feedingData: any) {
    console.log('=== onStagesFeedingCompleted ejecutado ===');
    console.log('Datos recibidos:', feedingData);
    
    // Aquí puedes ejecutar cualquier acción que necesites
    // cuando el StagesFeedingComponent se complete
    
    // Por ejemplo, actualizar el estado del componente
    this.stepFeeding = true;
    
    // Verificar si ambos pasos están completos
    if (this.stepPreference && this.stepFeeding) {
      this.hasCloseModal = true;
    }
    
    // Puedes agregar más lógica aquí según tus necesidades
    console.log('Acción ejecutada después de completar StagesFeeding');
    console.log('Estado actual - stepFeeding:', this.stepFeeding, 'hasCloseModal:', this.hasCloseModal);
  }

  async goToPreference(url: string) {
    console.log('Iniciando goTo...');
    
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
    // Más lógica si necesitas
  }

  postPlan(){
    this.isLoading = true
    this.stagesService.postNutritionPlan(this.storageService.getSessionStorage('stepFeeding'), this.storageService.getSessionStorage('stepPreference')).subscribe((resp: any)=> {
      this.isLoading = false
      this.nutritionPlan = resp
      //this.router.navigateByUrl('/newton/wellness/nutrition/my-results')
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
    // Detectar cuando el usuario presiona el botón de retroceso
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Botón de retroceso presionado en ModalFeeding');
      // Aquí puedes ejecutar lógica específica cuando el usuario presiona retroceso
      this.handleBackButton();
    });
  }

  handleBackButton() {
    // Lógica específica para cuando el usuario presiona retroceso
    console.log('Usuario intenta salir del modal con botón de retroceso');
    
    // Opcional: Mostrar confirmación antes de cerrar
    // this.showExitConfirmation();
    
    // O cerrar directamente
    this.modalCtrl.dismiss();
  }

}
