import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { CustomInputComponent } from './componentes/custom-input/custom-input.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmotionalModalComponent } from './componentes/emotional-modal/emotional-modal.component';
import { FormsIspsComponent } from './componentes/forms-isps/forms-isps.component';
import { FormIspsStepOneComponent } from './componentes/forms-isps/form-isps-step-one/form-isps-step-one.component';
import { FormIspsStepTwoComponent } from './componentes/forms-isps/form-isps-step-two/form-isps-step-two.component';



@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, EmotionalModalComponent,FormsIspsComponent, FormIspsStepOneComponent, FormIspsStepTwoComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
