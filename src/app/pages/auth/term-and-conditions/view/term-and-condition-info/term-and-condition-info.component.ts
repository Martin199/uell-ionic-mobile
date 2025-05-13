import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { close } from "ionicons/icons";

@Component({
    selector: 'app-term-and-condition-info',
    templateUrl: './term-and-condition-info.component.html',
    styleUrls: ['./term-and-condition-info.component.scss'],
    standalone: false
})
export class TermAndConditionInfoComponent implements OnInit {

    @Input() termsText!: string; // Recibe el texto de los términos y condiciones

    modalCtrl = inject(ModalController);

    constructor() {
        addIcons({ close });
    }

    ngOnInit() { }

    dismiss() {
        this.modalCtrl.dismiss();
    }

}
