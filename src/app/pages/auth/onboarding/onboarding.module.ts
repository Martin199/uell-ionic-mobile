import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { UserInfoComponent } from './steps/user-info/user-info.component';
import { UserEmploymentInfoComponent } from './steps/user-employment-info/user-employment-info.component';
import { UserContactInfoPageModule } from './steps/user-contact-info/user-contact-info.module';
import { UserAddressInfoModule } from './steps/user-address-info/user-address-info.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalInformationComponent } from './steps/medical-information/medical-information.component';
import { MedicalInformationSecondComponent } from './steps/medical-information-second/medical-information-second.component';
import { InitialClinicalDataComponent } from './steps/initial-clinical-data/initial-clinical-data.component';
import { UserPictureInfoComponent } from './steps/user-picture-info/user-picture-info.component';
import { IonHeader, IonToolbar, IonThumbnail, IonImg, IonProgressBar, IonContent, IonFooter, IonButtons, IonButton, IonRadioGroup, IonRadio, IonLabel, IonItem, IonCol, IonInput, IonModal, IonDatetime } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OnboardingPageRoutingModule,
        UserContactInfoPageModule,
        UserAddressInfoModule,
        SharedModule,
        ReactiveFormsModule,
        UserPictureInfoComponent,
        IonHeader,
        IonToolbar,
        IonThumbnail,
        IonImg,
        IonProgressBar,
        IonContent,
        IonFooter,
        IonButtons,
        IonButton,
        IonRadioGroup,
        IonRadio,
        IonLabel,
        IonRadioGroup,
        IonRadio,
        IonLabel,
        IonRadioGroup,
        IonRadio,
        IonLabel,
        IonItem,
        IonLabel,
        IonItem,
        IonCol,
        IonInput,
        IonModal,
        IonDatetime
    ],
    declarations: [
        OnboardingPage,
        UserInfoComponent,
        UserEmploymentInfoComponent,
        MedicalInformationComponent,
        MedicalInformationSecondComponent,
        InitialClinicalDataComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingPageModule { }
