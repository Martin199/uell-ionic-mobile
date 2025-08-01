import { Component, inject, input, signal, effect, OnInit } from '@angular/core';
import { IonContent, IonButton, IonImg, ModalController } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-success-modal',
  templateUrl: './create-success-modal.component.html',
  styleUrls: ['./create-success-modal.component.scss'],
  imports: [IonImg, IonButton, IonContent, SharedModule],
})
export class CreateSuccessModalComponent implements OnInit {
  private utils = inject(UtilsService);
  private modalCtrl = inject(ModalController);
  private authService = inject(AuthService);
  // Properties to receive data from componentProps

  type: 'success account' | 'success support' | 'error' | 'user exists' | 'contact support' | null = null;
  email = this.authService.email;
  title: string = '';
  text: string = '';
  button: 'login' | 'support' | null = null;
  image: string = '';
  countdown = signal(10);
  private isModalClosed = false;

  async navigate() {
    if (!this.isModalClosed) {
      this.isModalClosed = true;
      const route = this.button === 'support' ? '/auth/support' : '/auth';
      this.utils.navigateTo(route);
      await this.modalCtrl.dismiss();
    }
  }

  ngOnInit(): void {
    if (this.type === 'error' || this.type === 'success support') {
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

  getButtonText() {
    if (this.button === 'support') {
      return 'Contactar a soporte';
    } else if (this.button === 'login') {
      return 'Iniciar sesión';
    } else {
      return 'Volver al inicio de sesión';
    }
  }
}

export interface SuccessModalData {
  type: 'success account' | 'success support' | 'error' | 'user exists' | 'contact support';
  title: string;
  image: string;
  button: 'login' | 'support';
  text: string;
}
