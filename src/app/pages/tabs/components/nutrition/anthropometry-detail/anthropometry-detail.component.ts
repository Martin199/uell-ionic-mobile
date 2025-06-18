import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { AnthropometryService } from 'src/app/services/anthropometry.service';
import { UtilsService } from 'src/app/services/utils.service';
import { addDays, isAfter, isEqual } from 'date-fns';
import { AnthropometryComponent } from '../anthropometry/anthropometry.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-anthropometry-detail',
  templateUrl: './anthropometry-detail.component.html',
  styleUrls: ['./anthropometry-detail.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonicModule
  ]
})
export class AnthropometryDetailComponent  implements OnInit {

  pageTitle: string = 'Antropometría';
  lastAnthropometry: any;
  dateCreated: any;
  currentStatus!: boolean;
  userId: number | null = null;
  @Output() bodyStatus: EventEmitter<{ height: number, weight: number }> = new EventEmitter()
  @Output() anthropometryData: EventEmitter<boolean> = new EventEmitter()

  anthropometryService = inject(AnthropometryService);
  utilsService = inject(UtilsService);
  modalController = inject(ModalController);
  private userState = inject(UserStateService);
  
  constructor() { }

  ngOnInit(): void {

    this.userId = this.userState.userId();
    if (!this.userId) {
        console.error('No se puede obtener el id del usuario');
        return;
    }
    this.getAnthropometryDetail();
    this.getAnthropometryData();
    this.checkStatus();
  }

  checkStatus() {
    this.anthropometryService.getAnthropometryStatus.subscribe((res: any) => {
      this.currentStatus = res;
    })
  }

  async getAnthropometryDetail(): Promise<void> {
  try {
    let resp: any = await firstValueFrom(
      this.anthropometryService.getLast(this.userId!.toString())
    );

    const keys = Object.keys(resp).filter(key => resp[key] !== null);
    if (keys.length === 1 && keys[0] === 'completenessPercentage') {
      resp = null;
    }

    if (!resp || resp?.error?.message) {
      this.anthropometryService.setAnthropometryStatus = false;
    } else {
      this.anthropometryService.setAnthropometryStatus = true;
      this.lastAnthropometry = resp;
      this.checkValidity();
    }
  } catch (error) {
    console.error('Error al obtener datos antropométricos:', error);
    this.anthropometryService.setAnthropometryStatus = false;
  }
}

  botonHabilitado(): boolean {
    const created = this.lastAnthropometry?.created ? new Date(this.lastAnthropometry.created) : null;
    if (!created) return false;

    this.dateCreated = addDays(created, 30);
    return isAfter(new Date(), this.dateCreated) || isEqual(new Date(), this.dateCreated);
  }


  validateSetValue(){
    if (this.lastAnthropometry && this.botonHabilitado()) {
      return false
    } else if (!this.lastAnthropometry){
      return false
    } else {
      return true
    }
  }

  getAnthropometryData() {
    this.anthropometryService.getAnthropometryData.subscribe((res: any) => {
      this.lastAnthropometry = res;
      this.checkValidity();
      if (this.lastAnthropometry) {
        this.modalController.dismiss(this.lastAnthropometry);
      }
    })
  }

  hasThirtyDaysPassed(dateString: string): boolean {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - date.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays >= 30;
  }

  checkValidity() {
    if (!this.hasThirtyDaysPassed(this.lastAnthropometry?.created) &&
        this.lastAnthropometry?.weight &&
        this.lastAnthropometry?.height &&
        this.lastAnthropometry?.abdominalCircumference) {
          this.anthropometryService.setAnthropometryStatus = true;
          this.bodyStatus.emit({height: this.lastAnthropometry.height, weight: this.lastAnthropometry.weight })
          this.checkAnthropometryData();
    }
  }

  async goEdit() {
    const modal = await this.modalController.create({
        component: AnthropometryComponent,
        cssClass: 'custom-modal-class',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.lastAnthropometry.weight = data.weight;
      this.lastAnthropometry.height = data.height;
      this.lastAnthropometry.abdominalCircumference = data.abdominalCircumference;
      this.bodyStatus.emit({
        height: this.lastAnthropometry.height, 
        weight: this.lastAnthropometry.weight 
      });
      this.checkAnthropometryData();
    }    
  }

  checkAnthropometryData() {
    const disabledButton = (this.lastAnthropometry?.height && this.lastAnthropometry?.weight && this.lastAnthropometry?.abdominalCircumference) ? false : true;
    this.anthropometryData.emit(disabledButton)
  }

}
