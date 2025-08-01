import { Component, inject } from '@angular/core';
import { ModalController, IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-server-error-modal',
  templateUrl: './server-error-modal.component.html',
  styleUrls: ['./server-error-modal.component.scss'],
  imports: [IonButton, IonIcon],
})
export class ServerErrorModalComponent {
  private modalCtrl = inject(ModalController);

  title = 'Error';
  message = 'Ha ocurrido un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.';

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
