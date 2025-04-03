import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-mental-status',
  templateUrl: './card-mental-status.component.html',
  styleUrls: ['./card-mental-status.component.scss'],
})
export class CardMentalStatusComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);
  userService = inject(UserService);

  emotionalData = input<any[]>([]);
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
      const moods = this.mentalStatusData[0].moods;
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
        this.checkMentalStatus();
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
    if (postMentalStatus) {
      this.refreshMentalStatus();
    }
  }
}
