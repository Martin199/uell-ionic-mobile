import { Component, input, OnInit } from '@angular/core';
import { IMoodDayList } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-card-emotions-map',
  templateUrl: './card-emotions-map.component.html',
  styleUrls: ['./card-emotions-map.component.scss'],
})
export class CardEmotionsMapComponent implements OnInit {
  emotionMapData = input<IMoodDayList[]>([]);
  refreshEmotionMapModule = input<string>('');
  moodDayList: IMoodDayList[] = [];

  constructor() {}

  ngOnInit() {
    this.moodDayList = this.emotionMapData();
  }
}
