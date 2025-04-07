import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FilesService } from 'src/app/services/files.service';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  user: any;
  actionSheetActive: boolean = false;
  userAvatarUrl!: string;
  defaultAvatarUrl: string = '../../../../assets/imgs/icon-avatar.svg';

  storageService = inject(StorageService);
  actionSheetController = inject(ActionSheetController);
  utilServices = inject(UtilsService);
  fileService = inject(FilesService);
  mentalStatusService = inject(MentalStatusService);

  constructor() { }

  async ngOnInit() {
    this.user = this.storageService.getSessionStorage('user');
    await this.loadProfilePicture();
  }


  async presentActionSheet() {
    this.actionSheetActive = true;
    const actionSheet = await this.actionSheetController.create({
      mode:'md',
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
  
    if (this.user.photo && this.user.photo !== '') {
      let currentPhoto = localStorage.getItem('current_photo');
      this.fileService.downloadFile(currentPhoto? currentPhoto : this.user.photo).subscribe(
        (photo) => {
          this.userAvatarUrl = photo;
        },
        () => {
          this.userAvatarUrl = this.defaultAvatarUrl;
        }
      );
    } else if (currentPhoto) {
      this.userAvatarUrl = currentPhoto;
    } else {
      this.userAvatarUrl = this.defaultAvatarUrl;
    }
}

  logOut(){
    this.utilServices.showConfirmation(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      async () => {
        await this.mentalStatusService.clearEmotionalCache();
        await this.storageService.clearSessionStorage();
        this.utilServices.router.navigate(['/auth']);
      }
    );
  }

}
