import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-employment-info',
  templateUrl: './user-employment-info.component.html',
  styleUrls: ['./user-employment-info.component.scss'],
})
export class UserEmploymentInfoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('UserEmploymentInfoComponent');
  }

}
