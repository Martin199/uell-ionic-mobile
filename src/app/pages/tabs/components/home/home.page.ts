import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { EmotionalModalComponent } from 'src/app/shared/componentes/emotional-modal/emotional-modal.component';
import { User } from '../../interfaces/user-interfaces';
import { HomeService } from './config/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user!: User;
  moduleResults: any[] = [];

  storageService = inject(StorageService);
  modalCtrl = inject(ModalController)
  homeService = inject(HomeService);

  constructor() { }

  ngOnInit() {
    this.presentEmotionalModal();
    this.homeService.callAllMethodsForModule().subscribe({
      next: results => {
        this.moduleResults = results; 
        console.log('Resultados de los módulos:', this.moduleResults);
      },
      error: error => console.error('Error al obtener los módulos:', error),
    });
  }

  async presentEmotionalModal() {
    const user = this.storageService.getSessionStorage<User>('user');
    if (!user) return;
    this.user = user;

    const modal = await this.modalCtrl.create({
      component: EmotionalModalComponent,
      componentProps: {
        userName: this.user.name,
        userId: this.user.id,
      },
      backdropDismiss: false,
    });
    await modal.present();
  }

}
