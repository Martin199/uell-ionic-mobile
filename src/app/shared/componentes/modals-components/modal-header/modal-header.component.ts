import { Component, inject, Input, input, output } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-modal-header',
    templateUrl: './modal-header.component.html',
    styleUrls: ['./modal-header.component.scss'],
    standalone: false
})
export class ModalHeaderComponent {

    private modalCtrl = inject(ModalController);
    utilsService = inject(UtilsService)

    title = input<string>();
    subtitle = input<string>();
    routerUrl = input<string>();
    imgPatch = input<string>();
    imgDescription = input<string>();
    closeModal = input<boolean>(false);
    backButton = input<boolean>(false);
    cleanStorage = input<boolean>(false);
    @Input() customBackground: boolean = false;
    customClass = input<string>('');
    closeModalEvent = output<string>();
    backModalEvent = output();

    constructor() {}

    dissmisModal() {
        this.closeModalEvent.emit('dissmis');
        if (this.cleanStorage()) {
            sessionStorage.removeItem('stepFeeding');
            sessionStorage.removeItem('stepPreference');
        }
        if (this.routerUrl()) {
            this.utilsService.navCtrl.navigateRoot(['/newton']);
            this.modalCtrl.dismiss();
        } else {
            this.modalCtrl.dismiss({ dismiss: true });
        }
    }

    backEvent() {
        this.backModalEvent.emit();
    }

}
