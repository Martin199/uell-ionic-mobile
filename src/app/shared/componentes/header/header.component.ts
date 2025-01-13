import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
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

  storageService = inject(StorageService);
  actionSheetController = inject(ActionSheetController);
  utilServices = inject(UtilsService);

  constructor() { }

  ngOnInit() {
    this.user = this.storageService.getSessionStorage('user');
    console.log(this.user, 'header');
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

  logOut(){
    this.utilServices.showConfirmation('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', () => {
      this.storageService.clearSessionStorage();
      this.utilServices.router.navigate(['/auth']);
    });
  }

}
