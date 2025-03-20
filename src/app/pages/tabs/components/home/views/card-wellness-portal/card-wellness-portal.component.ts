import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { PortalService } from 'src/app/services/portal.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-card-wellness-portal',
  templateUrl: './card-wellness-portal.component.html',
  styleUrls: ['./card-wellness-portal.component.scss'],
})
export class CardWellnessPortalComponent implements OnInit  {

  @Input() tenantParameters : any;
  @Input() wellnessData: any;
  user: User= {} as User;
  imgUrl!: string;

  portalService = inject (PortalService)
  userService = inject (UserService)
  storageService = inject (StorageService)
  utilsService = inject (UtilsService)
  
  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
  }

  ngOnInit(): void {
    this.getlastWellnessPost();
  }

  findTenant(moduleActive: string) {
    return this.tenantParameters.tenantParameters?.activeModules?.find((module: any) => module === moduleActive);
  }

  getlastWellnessPost() {
    console.log(this.wellnessData, 'wellnesa')
    if (this.wellnessData && this.wellnessData?.title_image?.url) {
      this.userService.downloadFile(this.wellnessData.title_image.url).subscribe((url: string) => {
        this.imgUrl = url;
      });
    }
  }

  goTo(post: any) {
    this.utilsService.goTo(`tabs/wellness-portal/details/${post}`)
   
    // this.router.navigate(['newton/wellness-portal'], { replaceUrl: true });
    // this.trackingModules('wellness_blog');
  }

}
