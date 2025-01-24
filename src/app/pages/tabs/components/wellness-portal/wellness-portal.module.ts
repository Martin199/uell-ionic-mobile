import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WellnessPortalPageRoutingModule } from './wellness-portal-routing.module';

import { WellnessPortalPage } from './wellness-portal.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptimizedImageComponent } from 'src/app/shared/componentes/optimized-image/optimized-image.component';
import { RecommendedWellnessPortalComponent } from './components/recommended-wellness-portal/recommended-wellness-portal.component';
import { CarouselWellnessPortalComponent } from './components/carousel-wellness-portal/carousel-wellness-portal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WellnessPortalPageRoutingModule,
    SharedModule,
    OptimizedImageComponent,
  ],
  declarations: [
    WellnessPortalPage,
    RecommendedWellnessPortalComponent,
    CarouselWellnessPortalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WellnessPortalPageModule {}
