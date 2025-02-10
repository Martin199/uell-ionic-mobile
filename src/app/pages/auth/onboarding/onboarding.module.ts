import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { UserInfoComponent } from './steps/user-info/user-info.component';
import { UserEmploymentInfoComponent } from './steps/user-employment-info/user-employment-info.component';
import { UserContactInfoPageModule } from './steps/user-contact-info/user-contact-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    UserContactInfoPageModule
  ],
  declarations: [OnboardingPage, UserInfoComponent, UserEmploymentInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingPageModule {}
