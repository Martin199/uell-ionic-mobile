import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  IonContent,
  IonText,
  IonButton,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { FloatingHelpComponent } from './components/floating-help/floating-help.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    IonContent,
    IonText,
    IonButton,
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon,
    FloatingHelpComponent,
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
