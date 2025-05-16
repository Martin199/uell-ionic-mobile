import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-isps-result',
    templateUrl: './isps-result.component.html',
    styleUrls: ['./isps-result.component.scss'],
    standalone: false
})
export class IspsResultComponent {
  @Input() emocionalDimension: any;
  @Input() fisicoDimension: any;
  @Input() socialDimension: any;

  constructor() {}

  expandedEmocionalDimension = new Set<number>();
  expandedSocialDimension = new Set<number>();
  expandedFisicoDimension = new Set<number>();

  toggleExpandEmocionalDimension(index: number) {
    if (this.expandedEmocionalDimension.has(index)) {
      this.expandedEmocionalDimension.delete(index);
    } else {
      this.expandedEmocionalDimension.add(index);
    }
  }
  toggleExpandSocialDimension(index: number) {
    if (this.expandedSocialDimension.has(index)) {
      this.expandedSocialDimension.delete(index);
    } else {
      this.expandedSocialDimension.add(index);
    }
  }

  toggleExpandFisicoDimension(index: number) {
    if (this.expandedFisicoDimension.has(index)) {
      this.expandedFisicoDimension.delete(index);
    } else {
      this.expandedFisicoDimension.add(index);
    }
  }
}
