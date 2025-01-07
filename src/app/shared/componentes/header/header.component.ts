import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  user: any;

  storageService = inject(StorageService);

  constructor() { }

  ngOnInit() {
    this.user = this.storageService.getSessionStorage('user');
    console.log(this.user, 'header');
  }

}
