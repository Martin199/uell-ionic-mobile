import { Component, inject, OnInit, signal } from '@angular/core';
import { ActionSheetController } from '@ionic/angular/standalone';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { FilesService } from 'src/app/services/files.service';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
    user = signal<UserResponseDTO | null>(null);
    actionSheetActive: boolean = false;
    userAvatarUrl!: string;
    defaultAvatarUrl: string = '../../../../assets/imgs/icon-avatar.svg';

    storageService = inject(StorageService);
    actionSheetController = inject(ActionSheetController);
    utilServices = inject(UtilsService);
    fileService = inject(FilesService);
    mentalStatusService = inject(MentalStatusService);
    private userState = inject(UserStateService);

    constructor() { }

    async ngOnInit() {
        this.user.set(this.storageService.getSessionStorage('user'));
        await this.loadProfilePicture();
    }


    async presentActionSheet() {
        this.actionSheetActive = true;
        const actionSheet = await this.actionSheetController.create({
            mode: 'md',
            buttons: [
                //   {
                //   text: 'Mi perfil',
                //   icon: 'assets/person.svg',
                //   cssClass: 'person-icon',
                //   handler: () => {
                //   }

                // }, 
                //   {
                //   text: 'Cambiar contraseña',
                //   icon: 'assets/lock.svg',
                //   cssClass: 'lock-icon', 
                //   handler: () => {
                //   }
                // }, 
                {
                    text: 'Cerrar sesión',
                    icon: 'close-outline',
                    cssClass: 'icono-personalizado',
                    handler: () => {
                        this.logOut()
                    }
                },
            ]
        });

        await actionSheet.present();
    }

    async loadProfilePicture() {

        let currentPhoto = localStorage.getItem('current_photo');
        this.fileService
            .downloadFile(currentPhoto ? currentPhoto : this.user()?.photo!)
            .subscribe({
                next: (photo: any) => {
                    this.userAvatarUrl = photo;
                },
                error: (err) => {
                    console.error(err);
                    this.userAvatarUrl = this.defaultAvatarUrl;
                }
            });
    }

    logOut() {
        this.utilServices.showConfirmation(
            'Cerrar sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            async () => {
                await this.mentalStatusService.clearEmotionalCache();
                await this.storageService.clearSessionStorage();
                await localStorage.clear()
                this.utilServices.navCtrl.navigateRoot(['/auth']);
                this.userState.logout();
            }
        );
    }

}
