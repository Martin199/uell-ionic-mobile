import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recommended-wellness-portal',
  templateUrl: './recommended-wellness-portal.component.html',
  styleUrls: ['./recommended-wellness-portal.component.scss'],
})
export class RecommendedWellnessPortalComponent {

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Output() clickEvent = new EventEmitter<number>();

  constructor() { }

  redirectToPost(idPost: any) {
    this.clickEvent.emit(idPost);
  }

}
