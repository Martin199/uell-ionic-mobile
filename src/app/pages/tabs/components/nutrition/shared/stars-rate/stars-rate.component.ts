import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

interface IStarRate {
  rate: number;
  selected: boolean;
}

@Component({
  selector: 'app-stars-rate',
  templateUrl: './stars-rate.component.html',
  styleUrls: ['./stars-rate.component.scss'],
  standalone: true,
  imports: [NgFor, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class StarsRateComponent implements OnInit {
  rate: number = 0;

  @Input() isEditable: boolean = true;

  @Input() set initialRate(rate: number) {
    if (!rate) return;
    this.setStars(rate);
  }

  @Output() rateChange = new EventEmitter<number>();

  starRate: IStarRate[] = [
    { rate: 1, selected: false },
    { rate: 2, selected: false },
    { rate: 3, selected: false },
    { rate: 4, selected: false },
    { rate: 5, selected: false },
  ];

  constructor() {}

  ngOnInit(): void {}

  setStars(rate: number) {
    this.starRate.forEach((e) => {
      e.selected = rate >= e.rate;
    });
    this.rateChange.emit(rate);
  }

  setSelectedStars(rate: number) {
    if (!this.isEditable) return;
    this.setStars(rate);
  }
}
