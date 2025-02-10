import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contact-info',
  templateUrl: './user-contact-info.page.html',
  styleUrls: ['./user-contact-info.page.scss'],
})
export class UserContactInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('UserContactInfoPage');
  }

}
