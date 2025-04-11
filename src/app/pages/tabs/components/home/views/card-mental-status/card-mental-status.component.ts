import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UellCoinService } from 'src/app/services/uell-coin.service';
import { UserService } from 'src/app/services/user.service';
import { IMentalStatusResponse, IMoodsStatus } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-card-mental-status',
  templateUrl: './card-mental-status.component.html',
  styleUrls: ['./card-mental-status.component.scss'],
})
export class CardMentalStatusComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);
  uellCoinService = inject(UellCoinService);
  toastController = inject(ToastController);
  userService = inject(UserService);

  emotionalData = input<IMentalStatusResponse[]>([]);
  mentalStatusData: any[] = [];
  private _userInfo = this.userService.getUser();
  disabledBtn = signal<boolean>(true);
  disabledMentalStatusEdit = signal<boolean>(true);

  constructor() {}

  ngOnInit() {
    this.mentalStatusData = this.emotionalData();
    this.checkMentalStatus();
  }

  checkMentalStatus() {
    if (this.mentalStatusData.length === 0) {
      this.disabledBtn.set(false);
    } else if (this.mentalStatusData.length === 1) {
      const moods: IMoodsStatus = this.mentalStatusData[0].moods;
      if (moods.id && (moods.id === 1 || moods.id === 2 || moods.id === 3)) {
        this.disabledMentalStatusEdit.set(false);
      } else {
        this.disabledBtn.set(true);
      }
    } else {
      this.disabledMentalStatusEdit.set(true);
      this.disabledBtn.set(true);
    }
  }

  refreshMentalStatus() {
    this.mentalStatusService.getMentalStatus(this._userInfo.id).subscribe({
      next: (res: any) => {
        this.mentalStatusData = res;
        //TODO: habilitar Uellcoin cuando exista la imagen
        // this.checkMentalStatus();
        this.uellCoinService.showCoin();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  async openModalMentalStatus() {
    const postMentalStatus =
      await this.mentalStatusService.openModalMentalStatus();
    if (postMentalStatus.postMentalStatus) {
      this.refreshMentalStatus();
      this.presentWinToast(postMentalStatus.creditPoints);
    }
  }

  async presentWinToast(creditPoints: number) {
    creditPoints ? creditPoints : 1;
    const toast = await this.toastController.create({
      message: '🎉 Felicidades, ganaste ' + creditPoints + ' créditos',
      duration: 4000,
      position: 'bottom',
      cssClass: 'custom-toast',
      animated: true,
    });

    await toast.present();
  }
}
