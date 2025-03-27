import { Component, inject, input, OnInit } from '@angular/core';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UserService } from 'src/app/services/user.service';
import { IMoodDayList } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-card-emotions-map',
  templateUrl: './card-emotions-map.component.html',
  styleUrls: ['./card-emotions-map.component.scss'],
})
export class CardEmotionsMapComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);
  userService = inject(UserService);

  emotionMapData = input<IMoodDayList[]>([]);
  refreshEmotionMapModule = input<string>('');
  moodDayList: IMoodDayList[] = [];
  loading = false;

  constructor() {}

  private _userInfo = this.userService.getUser();

  ngOnInit() {
    this.moodDayList = this.emotionMapData();
    // if (this.refreshEmotionMapModule() === 'refresh') {
    //   const currentDate: Date = new Date();
    //   const currentYear: number = currentDate.getFullYear();
    //   const currentMonth: number = currentDate.getMonth();
    //   this.refreshEmotionalMap({ year: currentYear, month: currentMonth + 1 });
    // }
  }

  refreshEmotionalMap(event: { year: number; month: number }) {
    this.loading = true;
    this.mentalStatusService
      .getEmotionalMap(this._userInfo.id, event.year, event.month + 1)
      .subscribe({
        next: (res: any) => {
          this.moodDayList = res?.moodDayList ? res.moodDayList : [];
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
