import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { UserInfoComponent } from './steps/user-info/user-info.component';
import { UserEmploymentInfoComponent } from './steps/user-employment-info/user-employment-info.component';
import { UserContactInfoPageModule } from './steps/user-contact-info/user-contact-info.module';
import { UserAddressInfoModule } from './steps/user-address-info/user-address-info.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalInformationComponent } from './steps/medical-information/medical-information.component';
import { MedicalInformationSecondComponent } from './steps/medical-information-second/medical-information-second.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    UserContactInfoPageModule,
    UserAddressInfoModule,
    SharedModule
  ],
  declarations: [OnboardingPage, UserInfoComponent, UserEmploymentInfoComponent, MedicalInformationComponent, MedicalInformationSecondComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingPageModule {}
