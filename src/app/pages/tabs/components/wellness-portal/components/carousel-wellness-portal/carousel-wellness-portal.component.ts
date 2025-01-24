import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carousel-wellness-portal',
  templateUrl: './carousel-wellness-portal.component.html',
  styleUrls: ['./carousel-wellness-portal.component.scss'],
})
export class CarouselWellnessPortalComponent {

  @Input() title: string = '';
  @Output() clickEvent = new EventEmitter<number>();
  

  constructor() { }

  redirectToPost(idPost: any) {
    this.clickEvent.emit(idPost);
  }

}
