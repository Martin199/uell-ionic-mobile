import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { EmotionalModalComponent } from 'src/app/shared/componentes/emotional-modal/emotional-modal.component';
import { User } from '../../interfaces/user-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user!: User;

  storageService = inject(StorageService);
  modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {
    this.presentEmotionalModal();
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
