import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICarouselWellnessPortal } from 'src/app/pages/tabs/interfaces/wellness-portal-interfaces';

@Component({
  selector: 'app-recommended-wellness-portal',
  templateUrl: './recommended-wellness-portal.component.html',
  styleUrls: ['./recommended-wellness-portal.component.scss'],
})
export class RecommendedWellnessPortalComponent {

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() data!: ICarouselWellnessPortal;
  @Output() clickEvent = new EventEmitter<number>();

  constructor() { }

  redirectToPost(idPost: number) {
    this.clickEvent.emit(idPost);
  }

}
