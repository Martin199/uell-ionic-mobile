import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { close } from "ionicons/icons";

// import { ManagerResponse } from 'src/app/interfaces/wellness.interfaces';

@Component({
    selector: 'app-modal-description',
    templateUrl: './modal-description.component.html',
    styleUrls: ['./modal-description.component.scss'],
    standalone: false
})
export class ModalDescriptionComponent {

    @Input() manager: any;
    @Input() photo!: string;

    constructor(private modalCtrl: ModalController) {
        addIcons({ close });
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

}
