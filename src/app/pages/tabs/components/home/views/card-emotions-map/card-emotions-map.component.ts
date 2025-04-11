import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { IMoodDayList } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-card-emotions-map',
  templateUrl: './card-emotions-map.component.html',
  styleUrls: ['./card-emotions-map.component.scss'],
})
export class CardEmotionsMapComponent implements OnInit, OnDestroy {
  emotionMapData = input<IMoodDayList[]>([]);
  refreshEmotionMapModule = input<string>('');
  moodDayList: IMoodDayList[] = [];

  constructor() {}

  ngOnInit() {
    console.log('INICIADO CARD EMOTIONS MAP');
    this.moodDayList = this.emotionMapData();
  }

  ngOnDestroy(): void {
    console.log('DESTRUIDO CARD EMOTIONS MAP');
  }
}
