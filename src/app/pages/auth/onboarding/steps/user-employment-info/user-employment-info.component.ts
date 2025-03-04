import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-employment-info',
  templateUrl: './user-employment-info.component.html',
  styleUrls: ['./user-employment-info.component.scss'],
})
export class UserEmploymentInfoComponent  implements OnInit {

   storageService = inject(StorageService) 
    isOpen = false;
    displayDate: string = '';  
    user: User = this.storageService.getSessionStorage<User>('user')!;

  constructor() { }

  ngOnInit() {
    console.log(this.user);

    console.log('UserEmploymentInfoComponent');
  }

}
