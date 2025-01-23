import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { CustomInputComponent } from './componentes/custom-input/custom-input.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmotionalModalComponent } from './componentes/emotional-modal/emotional-modal.component';
import { IspsCircleComponent } from './componentes/isps-circle/isps-circle.component';
import { CountUpModule } from 'ngx-countup';
import { ModalDescriptionComponent } from './componentes/modal-description/modal-description.component';
import { UellMultimediaComponent } from './componentes/uell-multimedia/uell-multimedia.component';



@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, EmotionalModalComponent, IspsCircleComponent, ModalDescriptionComponent, UellMultimediaComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    CountUpModule
  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent,
    IspsCircleComponent,
    UellMultimediaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
