import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardPsicosocialComponent } from './views/card-psicosocial/card-psicosocial.component';
import { CardWellnessPortalComponent } from './views/card-wellness-portal/card-wellness-portal.component';
import { CardMentalStatusComponent } from './views/card-mental-status/card-mental-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    CardPsicosocialComponent,
    CardWellnessPortalComponent,
    CardMentalStatusComponent,
  ],
  exports: [CardPsicosocialComponent],
})
export class HomePageModule {}
