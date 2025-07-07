import { Component, Input, input, OnInit } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CIRCLE_THEMES, CircleTheme } from './circle-progress.contants';

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
  fallbackColor = '#F2F6FA';

  //! Para usar este componente, se debe declarar los colores, rangos y el nombre del módulo en el archivo circle-progress.constants.ts
  constructor() { }

  getColorScore(): string {
    const theme: CircleTheme | undefined = CIRCLE_THEMES[this.module.toLowerCase()];
    if (!theme) return this.fallbackColor;

    const index = theme.ranges.findIndex((range:number) => this.progress <= range);
    return theme.colors[index !== -1 ? index : theme.colors.length - 1];
  }
  
  hexToRGBA(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
