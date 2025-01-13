import { InformedConsentInfoComponent } from './view/informed-consent-info/informed-consent-info.component';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TermAndConditionInfoComponent } from './view/term-and-condition-info/term-and-condition-info.component';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-term-and-conditions',
  templateUrl: './term-and-conditions.page.html',
  styleUrls: ['./term-and-conditions.page.scss'],
})
export class TermAndConditionsPage implements OnInit {

    formTermCondition = new FormGroup({
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
      informedConsent: new FormControl(false, [Validators.requiredTrue]),
    })

  termAndCondition: any;

  modalCtrl = inject(ModalController);
  storageService = inject(StorageService);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  
  constructor() { }

  ngOnInit() {
    console.log(this.storageService.getSessionStorage('termsAndConditions'));
    this.termAndCondition = this.storageService.getSessionStorage('termsAndConditions')

  }

  goBack(){
    this.utilsService.goBack();
  }

  submit() {
    console.log(this.formTermCondition.value);
    const user: any = this.storageService.getSessionStorage('user');
    this.userService.postTermsAndConditions(user?.id).subscribe((res: any) => {
      this.utilsService.router.navigateByUrl('tabs/home');

     });

  }

  async openTermsModal() {
    const modal = await this.modalCtrl.create({
      component: TermAndConditionInfoComponent,
      componentProps: { termsText: this.termAndCondition[0]?.text }
    });
    await modal.present();
  }

  async openInformedConsentModal(){
    const modal = await this.modalCtrl.create({
      component: InformedConsentInfoComponent,
      componentProps: { termsText: this.termAndCondition[0]?.consentimiento_informado_text }
    });
    await modal.present();
  }


}
