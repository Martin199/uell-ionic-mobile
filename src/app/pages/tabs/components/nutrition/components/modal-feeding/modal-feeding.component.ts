import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagesService } from '../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgClass, NgIf } from '@angular/common';
import { StagesFeedingComponent } from '../stages-feeding/stages-feeding.component';
import {  ModalController } from '@ionic/angular/standalone';
import { StagesPreferenceComponent } from '../stages-preference/stages-preference.component';

@Component({
  selector: 'app-modal-feeding',
  templateUrl: './modal-feeding.component.html',
  styleUrls: ['./modal-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass, NgIf,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalFeedingComponent  implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.planNutrition = this.storageService.getLocalStorage("lastResultdPlan")
    if( JSON.parse(this.storageService.getSessionStorage('stepFeeding') || 'null')){
      this.stepFeeding = true
    } else {
      this.stepFeeding = false
    }

    if( JSON.parse(this.storageService.getSessionStorage('stepPreference') || 'null')){
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
      
      await modal.present();
      
  
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

}
