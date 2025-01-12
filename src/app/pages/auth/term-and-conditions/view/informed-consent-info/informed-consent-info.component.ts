import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-informed-consent-info',
  templateUrl: './informed-consent-info.component.html',
  styleUrls: ['./informed-consent-info.component.scss'],
})
export class InformedConsentInfoComponent  implements OnInit {

  @Input() termsText!: string; // Recibe el texto de los términos y condiciones

  modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
