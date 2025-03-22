import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { EmotionalModalComponent } from 'src/app/shared/componentes/emotional-modal/emotional-modal.component';
import { User } from '../../interfaces/user-interfaces';
import { HomeService } from './config/home.service';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { IMentalStatusResponse } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user!: User;
  moduleResults: any[] = [];
  tenantParameters: any;
  ispsData: any = null;
  wellnessData: any = null;
  emotionalModule: string = '';
  emotionalData: IMentalStatusResponse[] = [];

  storageService = inject(StorageService);
  modalCtrl = inject(ModalController)
  homeService = inject(HomeService);
  mentalStatusService = inject(MentalStatusService);

  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters')

    if (this.tenantParameters?.tenantParameters.gestorWillContactYou) {
      const gestorWillContactYou = this.tenantParameters.tenantParameters.gestorWillContactYou;
      console.log(gestorWillContactYou, ' gestor')
      gestorWillContactYou === 'true' ? localStorage.setItem('gestorWillContactYou', 'true') :
      gestorWillContactYou === 'false' ? localStorage.setItem('gestorWillContactYou', 'false') :
      localStorage.setItem('gestorWillContactYou', 'null');
    } 
    else {
      localStorage.setItem('gestorWillContactYou', 'null');
    }
   }

  async ngOnInit() {
    this.homeService.callAllMethodsForModule().subscribe({
      next: results => {
        this.moduleResults = results; 
        console.log('Resultados de los módulos:', this.moduleResults);

        // Filtrar por modulo
        const ispsModule = this.moduleResults.find(module => module.moduleName === 'isps');
        this.ispsData = ispsModule?.body || null;

        const wellnessModule = results.find((module) => module.moduleName === 'wellness');
        this.wellnessData = wellnessModule?.body || null;

        const emotionalModule = results.find((module) => module.moduleName === 'emotional');
        this.emotionalModule = emotionalModule?.moduleName || '';
        this.emotionalData = emotionalModule?.body || [];
      },
      error: error => console.error('Error al obtener los módulos:', error),
    });
  }
}
