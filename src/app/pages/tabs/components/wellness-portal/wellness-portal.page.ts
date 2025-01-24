import { Component } from '@angular/core';
import { ISearchbarAnimation } from 'src/app/shared/interface/searchbar-animation-interfaces';

@Component({
  selector: 'app-wellness-portal',
  templateUrl: './wellness-portal.page.html',
  styleUrls: ['./wellness-portal.page.scss'],
})
export class WellnessPortalPage {

  dataFindPost: ISearchbarAnimation[] = [{title:'Fede', id: 1}];

  constructor() { }

  redirectToPost(idPost: any) {
    console.log(idPost);
    // this.router.navigateByUrl(`newton/wellness-portal/details/${idPost}`)
  }

}
