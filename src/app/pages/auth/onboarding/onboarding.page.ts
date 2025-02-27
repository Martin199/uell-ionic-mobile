import { Component } from '@angular/core';
import { IContactInfo } from 'src/app/shared/interface/country-interfaces';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {

  contactInfo: IContactInfo | null = null;
  stepUserContactInfo: boolean = false;

  constructor() { }

  setContactInfo(event: any) {
    this.contactInfo = event.data
    this.stepUserContactInfo = event.isValid
  }

}
