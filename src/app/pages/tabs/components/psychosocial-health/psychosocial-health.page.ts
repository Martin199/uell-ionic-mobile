import { TrackingService } from './../../../../services/tracking.service';
import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsIspsComponent } from 'src/app/shared/componentes/forms-isps/forms-isps.component';
import { HomeService } from '../home/config/home.service';
import { User } from '../../interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { ISPSService } from 'src/app/services/isps.service';
import { UserStateService } from 'src/app/core/state/user-state.service';

@Component({
    selector: 'app-psychosocial-health',
    templateUrl: './psychosocial-health.page.html',
    styleUrls: ['./psychosocial-health.page.scss'],
    standalone: false
})
export class PsychosocialHealthPage {

    ispsData: any = null;
    userId: number | null = null;
    utilService = inject(UtilsService);
    storageService = inject(StorageService)
    ispsService = inject(ISPSService)
    trackingService = inject(TrackingService)
    private userState = inject(UserStateService);

    constructor() {
        // this.user = this.storageService.getSessionStorage<User>('user')!;
        this.userId = this.userState.userId();
        if (!this.userId) {
            console.error('No se puede obtener el id del usuario');
            return;
        }
        this.getIspsData();
        this.trackingService.trackingUser(this.userId.toString(), 'ISPS').subscribe()
    }

    getIspsData() {
        this.ispsService.getISPSScore(this.userId!).subscribe((data: any) => {
            this.ispsData = data;
        })
    }
}
