import { TrackingService } from './../../../../services/tracking.service';
import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsIspsComponent } from 'src/app/shared/componentes/forms-isps/forms-isps.component';
import { HomeService } from '../home/config/home.service';
import { User } from '../../interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { ISPSService } from 'src/app/services/isps.service';

@Component({
    selector: 'app-psychosocial-health',
    templateUrl: './psychosocial-health.page.html',
    styleUrls: ['./psychosocial-health.page.scss'],
    standalone: false
})
export class PsychosocialHealthPage {

    ispsData: any = null;
    user: User;
    utilService = inject(UtilsService);
    storageService = inject(StorageService)
    ispsService = inject(ISPSService)
    trackingService = inject(TrackingService)

    constructor() {
        this.user = this.storageService.getSessionStorage<User>('user')!;
        this.getIspsData();
        this.trackingService.trackingUser(this.user.id.toString(), 'ISPS').subscribe()
    }

    getIspsData() {
        this.ispsService.getISPSScore(this.user.id).subscribe((data: any) => {
            this.ispsData = data;
        })
    }
}
