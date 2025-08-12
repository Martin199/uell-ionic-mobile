import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonTextarea,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonButton,
  IonItemGroup,
} from '@ionic/angular/standalone';
import { OCCUPATIONAL_HEALTH_FORM } from '../../../../const/clinical-history-questionary.const';
import { InitialClinicalData } from '../../../../interfaces';

@Component({
  selector: 'app-general-information-questionary',
  templateUrl: './general-information-questionary.component.html',
  styleUrls: ['./general-information-questionary.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonTextarea,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonButton,
    IonItemGroup,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GeneralInformationQuestionaryComponent implements OnInit {
  private fb = inject(FormBuilder);
  returnResponse = output<InitialClinicalData>();
  form!: FormGroup;
  formConfig = OCCUPATIONAL_HEALTH_FORM;
  currentStep = this.formConfig.steps.find(step => step.id === 'general-info');

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const formControls: { [key: string]: any } = {};

    if (this.currentStep) {
      this.currentStep.fields.forEach(field => {
        if (field.required) {
          // For radio fields, default to false (No)
          if (field.type === 'radio') {
            formControls[field.id] = [false, Validators.required];
          } else {
            formControls[field.id] = ['', Validators.required];
          }
        } else {
          // For radio fields, default to false (No)
          if (field.type === 'radio') {
            formControls[field.id] = [false];
          } else {
            formControls[field.id] = [''];
          }
        }
      });
    }

    this.form = this.fb.group(formControls);
  }

  private returnValid() {
    // Map the form values to match the InitialClinicalData interface
    const formData = this.form.value;
    const clinicalData: InitialClinicalData = {
      takesMedication: formData.current_medication || false,
      hadJobAccidents: formData.work_accident || false,
      hadJobSickness: formData.professional_disease || false,
      hadPreviousJobs: formData.previous_work || false,
      hadVaccines: formData.recent_vaccines || false,
    };

    this.returnResponse.emit(clinicalData);
  }

  onSubmit() {
    if (this.form.valid) {
      this.returnValid();
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  isFieldValid(fieldId: string): boolean {
    const control = this.form.get(fieldId);
    return !!(control?.invalid && control?.touched);
  }
}
