import { Component, Input, input, OnInit } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {
  ispsCircleColors,
  ispsCircleRanges,
  nutritionCircleColors,
  nutritionCircleRanges,
} from './circle-progress.contants';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
  standalone: true,
  imports: [RoundProgressModule]
})
export class CircleProgressComponent {

  @Input() progress: number = 0;
  @Input() module: string = '';

  constructor() { }


  getColorScore() {
      let colors: string[] = [];
      let ranges: number[] = [];

      // Elegimos colores y rangos según el módulo
      switch (this.module.toLowerCase()) {
        case 'isps':
          colors = ispsCircleColors;
          ranges = ispsCircleRanges;
          break;
        case 'nutrition':
          colors = nutritionCircleColors;
          ranges = nutritionCircleRanges;
          break;
        default:
          return '#F2F6FA'; // Color por defecto si el módulo no está definido
      }

      const index = ranges.findIndex(range => this.progress <= range);
      return colors[index !== -1 ? index : colors.length - 1];

  } 
  

  hexToRGBA(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
