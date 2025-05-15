import { Component, computed, inject, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-user-employment-info',
    templateUrl: './user-employment-info.component.html',
    styleUrls: ['./user-employment-info.component.scss'],
    standalone: false
})
export class UserEmploymentInfoComponent implements OnInit {

    storageService = inject(StorageService)
    private userState = inject(UserStateService);
    isOpen = false;
    displayDate: string = '';
    // user: User = this.storageService.getSessionStorage<User>('user')!;
    user = computed(() => this.userState.userData());

    constructor() { }

    ngOnInit() {
        console.log(this.user);

        console.log('UserEmploymentInfoComponent');
    }

}
