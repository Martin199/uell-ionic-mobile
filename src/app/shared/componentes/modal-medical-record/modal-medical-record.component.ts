import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-medical-record',
  templateUrl: './modal-medical-record.component.html',
  styleUrls: ['./modal-medical-record.component.scss'],
})
export class ModalMedicalRecordComponent{

  modalController = inject (ModalController);
  constructor() { }

  closeModal(accepted: boolean, body?: any, bodyTwo?: any) {
    this.modalController.dismiss({
      accepted,
      body,
      bodyTwo
    });
  }

}
