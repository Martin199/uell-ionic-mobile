import { Component, inject, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { ISPSScore, ManagerResponse } from 'src/app/core/interfaces/isps';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { ISPSService } from 'src/app/services/isps.service';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';
import { Utils } from 'src/app/pages/tabs/components/home/utils/utils';
import { UserService } from 'src/app/services/user.service';
import { ModalDescriptionComponent } from 'src/app/shared/componentes/modal-description/modal-description.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-psicosocial',
  templateUrl: './card-psicosocial.component.html',
  styleUrls: ['./card-psicosocial.component.scss'],
})
export class CardPsicosocialComponent  implements OnInit {

  user: User= {} as User;
  _ISPSScore: ISPSScore = {} as ISPSScore;
  score: boolean = false;
  hasEditISPS: boolean = false;
  porcentajeProgressBar: number = 0;
  totalProgressBar: number = 0;
  scoreDescription: any;
  managerData: ManagerResponse = {} as ManagerResponse;
  tooltipText: string = '';
  isColombia: boolean = false;
  urlImg: string = 'assets/highlights/person.svg';
  tenantParameters: any;
  

  ispsService = inject (ISPSService);
  storageService = inject(StorageService);
  userService = inject(UserService)
  modalCtrl = inject (ModalController)

  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters')
   }

  async ngOnInit() {
    this.user = await this.storageService.getSessionStorage<User>('user') !;
    this.getISPSScore();
  }

  getISPSScore() {
    this.ispsService
      .getISPSScore(this.user.id)
      .pipe(shareReplay(1))
      .subscribe((score: any) => {
        this._ISPSScore = score;
        this._ISPSScore.score ? (this.score = true) : (this.score = false);
        this.validatorsCalculateISPS();
        this.getDescriptionWellnes();
        if (this._ISPSScore?.remainingSessions && this._ISPSScore?.totalSessions) {
          this.porcentajeProgressBar = (this._ISPSScore.remainingSessions / this._ISPSScore.totalSessions) * 100;
          this.totalProgressBar = ((this._ISPSScore.remainingSessions / this._ISPSScore.totalSessions) * 100) / 100;
        } else {
          this.porcentajeProgressBar = 0;
        }
        this.scoreDescription = this.isColombia ? Utils.returnSpeechIndiceLATAM(score.score): Utils.returnSpeechIndice(score.score);
        sessionStorage.setItem('ipsScore', JSON.stringify(this._ISPSScore))
        sessionStorage.setItem('ipsScoreTotal', JSON.stringify(this._ISPSScore.score))
      });
  }

  validatorsCalculateISPS() {
    if (this._ISPSScore.score === null || this._ISPSScore.allowRedoIt || this.calculateDate()) {
      this.hasEditISPS = false;
    } else {
      this.hasEditISPS = true;
    }
  }

  calculateDate() {
    if (this._ISPSScore.updated) {
      const isIspValid = moment(this._ISPSScore.updated).add(45, 'days').format('YYYY-MM-DD');
      return moment().isSameOrAfter(isIspValid);
    }
    return false;
  }

  getDescriptionWellnes() {
    if (this._ISPSScore?.managerId) {
      this.ispsService.getWellnessManager(this._ISPSScore.managerId).subscribe((data: any) => {
        this.managerData = data.content;
        //!!!!!!!!! TODO - validar imagen de gestor !!!!!!!!!!!!!!!!!!!!!!!!
        if (this.managerData.profilePicture) {
          this.userService.downloadFile(this.managerData.profilePicture).subscribe((x) => {
            this.urlImg = x;
          });
        }
      });
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

}
