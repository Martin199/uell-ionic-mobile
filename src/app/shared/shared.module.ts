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
import { FormsIspsComponent } from './componentes/forms-isps/forms-isps.component';
import { FormIspsStepOneComponent } from './componentes/forms-isps/form-isps-step-one/form-isps-step-one.component';
import { FormIspsStepTwoComponent } from './componentes/forms-isps/form-isps-step-two/form-isps-step-two.component';
import { SearchbarAnimationComponent } from './componentes/searchbar-animation/searchbar-animation.component';
import { FormIspsStepThreeComponent } from './componentes/forms-isps/form-isps-step-three/form-isps-step-three.component';
import { FormIspsStepFourComponent } from './componentes/forms-isps/form-isps-step-four/form-isps-step-four.component';
import { ModalMentalStatusComponent } from './componentes/modals-components/modal-mental-status/modal-mental-status.component';
import { ModalHeaderComponent } from './componentes/modals-components/modal-header/modal-header.component';
import { ModalFooterComponent } from './componentes/modals-components/modal-footer/modal-footer.component';
import { EmotionStatusComponent } from './componentes/emotion-status/emotion-status.component';
import { MoodStatusComponent } from './componentes/mood-status/mood-status.component';
import { ContextStatusComponent } from './componentes/context-status/context-status.component';



@NgModule({
  declarations: [
    HeaderComponent,
     CustomInputComponent, 
     LogoComponent, 
     EmotionalModalComponent, 
     IspsCircleComponent, 
     ModalDescriptionComponent, 
     UellMultimediaComponent,
     FormsIspsComponent, 
     FormIspsStepOneComponent, 
     FormIspsStepTwoComponent, 
     FormIspsStepThreeComponent,
     FormIspsStepFourComponent, 
     SearchbarAnimationComponent, 
     UellMultimediaComponent,
     ModalMentalStatusComponent,
     ModalHeaderComponent,
     ModalFooterComponent,
     MoodStatusComponent,
     EmotionStatusComponent,
     ContextStatusComponent,

    ],
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
    UellMultimediaComponent,
    SearchbarAnimationComponent,
    ModalMentalStatusComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
