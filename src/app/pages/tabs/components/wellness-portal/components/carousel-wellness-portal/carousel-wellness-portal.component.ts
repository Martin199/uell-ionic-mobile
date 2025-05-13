import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICarouselWellnessPortal } from 'src/app/pages/tabs/interfaces/wellness-portal-interfaces';

@Component({
    selector: 'app-carousel-wellness-portal',
    templateUrl: './carousel-wellness-portal.component.html',
    styleUrls: ['./carousel-wellness-portal.component.scss'],
    standalone: false
})
export class CarouselWellnessPortalComponent {

  @Input() title: string = '';
  @Input() data: ICarouselWellnessPortal[] = [];
  @Output() clickEvent = new EventEmitter<number>();
  defaultImgUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY8cq53evFoKvhcEMFYQonH2OYhJ__N0dL9w&s';

  constructor() { }

  redirectToPost(idPost: number) {
    this.clickEvent.emit(idPost);
  }

}
