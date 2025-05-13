import { Component, inject, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-modal-mail-registered',
    templateUrl: './modal-mail-registered.component.html',
    styleUrls: ['./modal-mail-registered.component.scss'],
    standalone: false
})
export class ModalMailRegisteredComponent {

    @Input() email!: string;
    utilsService = inject(UtilsService);

    constructor() { }

    closeModal() {
        this.utilsService.modalCtrl.dismiss({});
    }

}
