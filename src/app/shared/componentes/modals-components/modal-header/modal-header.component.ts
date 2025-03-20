import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {

    private modalCtrl = inject(ModalController);
    private router = inject(Router);

    title = input <string>();
    subtitle = input <string>();
    routerUrl = input <string>();
    imgPatch = input <string>();
    imgDescription = input <string>();
    closeModal = input <boolean>(false);
    backButton = input <boolean>(false);
    cleanStorage = input <boolean>(false);
    closeModalEvent = output <string>();
    backModalEvent = output();

  constructor() {}

  dissmisModal() {
    this.closeModalEvent.emit('dissmis');
    if (this.cleanStorage()) {
      sessionStorage.removeItem('stepFeeding');
      sessionStorage.removeItem('stepPreference');
    }
    if (this.routerUrl()) {
      this.router.navigateByUrl('/newton');
      this.modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss({ dismiss: true });
    }
  }

  backEvent() {
    this.backModalEvent.emit();
  }

}
