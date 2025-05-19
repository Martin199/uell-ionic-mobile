import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISPSScore, ManagerResponse } from 'src/app/pages/tabs/interfaces/isps';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { ISPSService } from 'src/app/services/isps.service';
import { StorageService } from 'src/app/services/storage.service';
import moment from 'moment';
import { Utils } from 'src/app/pages/tabs/components/home/utils/utils';
import { UserService } from 'src/app/services/user.service';
import { ModalDescriptionComponent } from 'src/app/shared/componentes/modal-description/modal-description.component';
import { ModalController } from '@ionic/angular/standalone';
import { FormsIspsComponent } from 'src/app/shared/componentes/forms-isps/forms-isps.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-card-psicosocial',
    templateUrl: './card-psicosocial.component.html',
    styleUrls: ['./card-psicosocial.component.scss'],
    standalone: false,
})
export class CardPsicosocialComponent implements OnInit, OnChanges {
    @Input() ispsData: ISPSScore = {} as ISPSScore;
    tenantParameters: any;
    user: User = {} as User;
    score: boolean | null = false;
    hasEditISPS: boolean = false;
    porcentajeProgressBar: number = 0;
    totalProgressBar: number = 0;
    scoreDescription: any;
    managerData: ManagerResponse = {} as ManagerResponse;
    isColombia: boolean = false;
    urlImg: string = 'assets/highlights/person.svg';
    viewBtnTurnito: boolean = false;
    emocionalDimension: any;
    fisicoDimension: any;
    socialDimension: any;

    ispsService = inject(ISPSService);
    storageService = inject(StorageService);
    userService = inject(UserService);
    modalCtrl = inject(ModalController);
    utilService = inject(UtilsService);

    constructor() {
        this.tenantParameters =
          this.storageService.getSessionStorage('tenantParameters');
        if (this.tenantParameters.tenantParameters.gestorWillContactYou) {
            const gestorWillContactYou =
                this.tenantParameters.tenantParameters.gestorWillContactYou;
            // gestorWillContactYou === 'true' ? localStorage.setItem('gestorWillContactYou', 'true') :
            // gestorWillContactYou === 'false' ? localStorage.setItem('gestorWillContactYou', 'false') :
            this.viewBtnTurnito =
                gestorWillContactYou === 'true' || gestorWillContactYou !== 'false'
                    ? true
                    : false;

            localStorage.setItem('gestorWillContactYou', 'null');
        } else {
            // this.psychosocialService.gestorWillContactYouSubject$.next(true)
            this.viewBtnTurnito = true;
            localStorage.setItem('gestorWillContactYou', 'null');
        }
    }

    async ngOnInit() {
        this.user = await this.storageService.getSessionStorage<User>('user')!;
        this.setDimensions(this.ispsData);

        // this.getISPSScore();
        // this.viewBtnTurnito = this.psychosocialService.getGestorWillContactYou()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['ispsData'] && changes['ispsData'].currentValue) {
            this.getISPSScore();
        }
    }

    getISPSScore() {
        this.ispsData.score ? (this.score = true) : (this.score = false);
        this.validatorsCalculateISPS();
        this.getDescriptionWellnes();
        if (this.ispsData?.remainingSessions && this.ispsData?.totalSessions) {
            this.porcentajeProgressBar =
                (this.ispsData.remainingSessions / this.ispsData.totalSessions) * 100;
            this.totalProgressBar =
                ((this.ispsData.remainingSessions / this.ispsData.totalSessions) *
                    100) /
                100;
        } else {
            this.porcentajeProgressBar = 0;
        }
        this.scoreDescription = this.isColombia
            ? Utils.returnSpeechIndiceLATAM(this.ispsData.score)
            : Utils.returnSpeechIndice(this.ispsData.score);
    }

    validatorsCalculateISPS() {
        if (
            this.ispsData.score === null ||
            this.ispsData.allowRedoIt ||
            this.calculateDate()
        ) {
            this.hasEditISPS = false;
        } else {
            this.hasEditISPS = true;
        }
    }

    calculateDate() {
        if (this.ispsData.updated) {
            const isIspValid = moment(this.ispsData.updated)
                .add(45, 'days')
                .format('YYYY-MM-DD');
            return moment().isSameOrAfter(isIspValid);
        }
        return false;
    }

    getDescriptionWellnes() {
        if (this.ispsData?.managerId) {
            this.ispsService
                .getWellnessManager(this.ispsData.managerId)
                .subscribe((data: any) => {
                    this.managerData = data.content;
                    //!!!!!!!!! TODO - validar imagen de gestor !!!!!!!!!!!!!!!!!!!!!!!!
                    if (this.managerData.profilePicture) {
                        this.userService
                            .downloadFile(this.managerData.profilePicture)
                            .subscribe((x) => {
                                this.urlImg = x;
                            });
                    }
                });
        }
    }

    async goIsps() {
        const modal = await this.utilService.modalCtrl.create({
            component: FormsIspsComponent,
        });
        await modal.present();

        const { data } = await modal.onDidDismiss();
        if (data?.updated) {
          this.refreshISPS();
        }
    }

    refreshISPS() {
        this.ispsService.getISPSScore(this.user.id).subscribe((data: any) => {
            this.ispsData = data;
            this.getISPSScore();
            this.setDimensions(data);
        });
    }

    setDimensions(data: any) {
        if (data.dimentionDTO && data.dimentionDTO.length > 0) {
            this.emocionalDimension = data.dimentionDTO.find(
                (dimension: any) => dimension.name === 'Emocional'
            );
            this.fisicoDimension = data.dimentionDTO.find(
                (dimension: any) => dimension.name === 'Físico'
            );
            this.socialDimension = data.dimentionDTO.find(
                (dimension: any) => dimension.name === 'Social'
            );
        }
    }

    async showModal() {
        if (Object.keys(this.managerData).length !== 0) {
            const modal = await this.modalCtrl.create({
                component: ModalDescriptionComponent,
                cssClass: 'modal-description',
                backdropDismiss: false,
                componentProps: { manager: this.managerData, photo: this.urlImg },
            });
            await modal.present();
        }
    }

    openTurnito() {
        this.ispsService.postSelfAppointmentManaggerTurnito(this.user.id);
        window.open('https://turnito.app/p/uell-bienestar', '_blank');
    }
}
