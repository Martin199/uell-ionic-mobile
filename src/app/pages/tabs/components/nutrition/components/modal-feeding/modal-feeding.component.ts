import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagesService } from '../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-feeding',
  templateUrl: './modal-feeding.component.html',
  styleUrls: ['./modal-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass, NgIf],
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

  goTo(url: string){
    this.utilsService.router.navigateByUrl(`/newton/wellness/nutrition/${url}`);
    this.utilsService.closeModal()
  }

}
