import { Component , Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
// import { ManagerResponse } from 'src/app/interfaces/wellness.interfaces';

@Component({
  selector: 'app-modal-description',
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.scss']
})
export class ModalDescriptionComponent {

  @Input() manager: any;
  @Input() photo!: string;

  constructor(private modalCtrl: ModalController) {}  

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
