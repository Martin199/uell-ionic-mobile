import { Component, inject, Input, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { ISPSScore, ManagerResponse } from 'src/app/pages/tabs/interfaces/isps';
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

  @Input() ispsScore: ISPSScore = {} as ISPSScore;
  tenantParameters : any;
  user: User= {} as User;
  score: boolean = false;
  hasEditISPS: boolean = false;
  porcentajeProgressBar: number = 0;
  totalProgressBar: number = 0;
  scoreDescription: any;
  managerData: ManagerResponse = {} as ManagerResponse;
  isColombia: boolean = false;
  urlImg: string = 'assets/highlights/person.svg';


  ispsService = inject (ISPSService);
  storageService = inject(StorageService);
  userService = inject(UserService)
  modalCtrl = inject (ModalController)

  constructor() { 
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
   }

  async ngOnInit() {
    this.user = await this.storageService.getSessionStorage<User>('user') !;
    this.getISPSScore();
  }
  
  getISPSScore() {
    this.ispsScore.score ? (this.score = true) : (this.score = false);
    this.validatorsCalculateISPS();
    this.getDescriptionWellnes();
    if (this.ispsScore?.remainingSessions && this.ispsScore?.totalSessions) {
      this.porcentajeProgressBar = (this.ispsScore.remainingSessions / this.ispsScore.totalSessions) * 100;
      this.totalProgressBar = ((this.ispsScore.remainingSessions / this.ispsScore.totalSessions) * 100) / 100;
    } else {
      this.porcentajeProgressBar = 0;
    }
    this.scoreDescription = this.isColombia ? Utils.returnSpeechIndiceLATAM(this.ispsScore.score): Utils.returnSpeechIndice(this.ispsScore.score);
  }

  validatorsCalculateISPS() {
    if (this.ispsScore.score === null || this.ispsScore.allowRedoIt || this.calculateDate()) {
      this.hasEditISPS = false;
    } else {
      this.hasEditISPS = true;
    }
  }

  calculateDate() {
    if (this.ispsScore.updated) {
      const isIspValid = moment(this.ispsScore.updated).add(45, 'days').format('YYYY-MM-DD');
      return moment().isSameOrAfter(isIspValid);
    }
    return false;
  }

  getDescriptionWellnes() {
    if (this.ispsScore?.managerId) {
      this.ispsService.getWellnessManager(this.ispsScore.managerId).subscribe((data: any) => {
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
