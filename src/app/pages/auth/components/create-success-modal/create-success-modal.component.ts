import { Component, inject, input, signal, effect } from '@angular/core';
import { IonContent, IonButton, IonImg, ModalController } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-success-modal',
  templateUrl: './create-success-modal.component.html',
  styleUrls: ['./create-success-modal.component.scss'],
  imports: [IonImg, IonButton, IonContent, SharedModule],
})
export class CreateSuccessModalComponent {
  private utils = inject(UtilsService);
  private modalCtrl = inject(ModalController);
  private authService = inject(AuthService);

  // Properties to receive data from componentProps
  type: 'success' | 'error' = 'error';
  email: string = this.authService.email() ?? '';

  countdown = signal(10);
  private isModalClosed = false;

  async navigateToHelp() {
    if (!this.isModalClosed) {
      this.isModalClosed = true;
      await this.modalCtrl.dismiss();
      this.utils.navigateTo('/auth/support');
    }
  }

  constructor() {
    if (this.type === 'error') {
      this.startCountdown();
    }
  }

  private startCountdown() {
    this.countdown.set(10);
    const interval = window.setInterval(() => {
      if (this.countdown() <= 1 && !this.isModalClosed) {
        this.isModalClosed = true;
        this.modalCtrl.dismiss();
        this.utils.navigateTo('/auth');
        clearInterval(interval);
      } else if (!this.isModalClosed) {
        this.countdown.update(value => value - 1);
      }
    }, 1000);
  }

  getImage() {
    if (this.type === 'success') {
      return 'assets/login/success.svg';
    } else {
      return 'assets/login/error.svg';
    }
  }

  getTitle() {
    if (this.type === 'success') {
      return '¡Ya creaste tu cuenta!';
    } else {
      return 'Alcanzaste el número máximo de intentos permitidos';
    }
  }
}
