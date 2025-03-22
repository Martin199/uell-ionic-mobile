import { Component, inject, OnInit, signal } from '@angular/core';
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

  private _userInfo = this.userService.getUser();
  disabledBtn = signal<boolean>(true);

  constructor() {}

  ngOnInit() {
    this.getMentalStatus();
    console.log('habilitar el modal?');
  }

  getMentalStatus() {
    this.mentalStatusService.getMentalStatus(this._userInfo.id).subscribe({
      next: (res: any) => {
        this.disabledBtn.set(false);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  openModalMentalStatus() {
    this.mentalStatusService.openModalMentalStatus();
  }
}
