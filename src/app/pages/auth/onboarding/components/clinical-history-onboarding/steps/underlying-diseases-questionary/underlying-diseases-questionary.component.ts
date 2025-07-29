import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import {
  IonContent,
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
  RadioGroupChangeEventDetail,
} from '@ionic/angular/standalone';
import { OCCUPATIONAL_HEALTH_FORM } from '../../../../const/clinical-history-questionary.const';
import { MedicalHistoryDiseasesClass } from '../../../../interfaces';
import { IonRadioGroupCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-underlying-diseases-questionary',
  templateUrl: './underlying-diseases-questionary.component.html',
  styleUrls: ['./underlying-diseases-questionary.component.scss'],
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
export class UnderlyingDiseasesQuestionaryComponent implements OnInit {
  returnResponse = output<MedicalHistoryDiseasesClass>();
  form!: FormGroup;
  formConfig = OCCUPATIONAL_HEALTH_FORM;
  currentStep = this.formConfig.steps.find(step => step.id === 'medical-conditions');

  constructor(private fb: FormBuilder) {}

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

        // Add subfields if they exist - initially not required
        if (field.subFields) {
          field.subFields.forEach(subField => {
            if (subField.type === 'checkbox') {
              formControls[subField.id] = this.fb.array([]);
            } else if (subField.type === 'radio') {
              formControls[subField.id] = [''];
            } else {
              formControls[subField.id] = [''];
            }
          });
        }
      });
    }

    this.form = this.fb.group(formControls);
    this.setupConditionalValidation();
  }

  private setupConditionalValidation() {
    if (this.currentStep) {
      this.currentStep.fields.forEach(field => {
        if (field.subFields) {
          const parentControl = this.form.get(field.id);
          if (parentControl) {
            parentControl.valueChanges.subscribe(value => {
              field.subFields?.forEach(subField => {
                const subFieldControl = this.form.get(subField.id);
                if (subFieldControl) {
                  if (value === true && subField.required) {
                    subFieldControl.setValidators([Validators.required]);
                  } else {
                    subFieldControl.clearValidators();
                  }
                  subFieldControl.updateValueAndValidity();
                }
              });
            });
          }
        }
      });
    }

    // Set up conditional validation for diabetes_type field
    const diabetesControl = this.form.get('diabetes');
    const diabetesTypeControl = this.form.get('diabetes_type');

    if (diabetesControl && diabetesTypeControl) {
      diabetesControl.valueChanges.subscribe(value => {
        if (value === true) {
          diabetesTypeControl.setValidators([Validators.required]);
        } else {
          diabetesTypeControl.clearValidators();
          diabetesTypeControl.setValue('');
        }
        diabetesTypeControl.updateValueAndValidity();
      });
    }
  }

  onCheckboxChange(event: any, fieldId: string) {
    const formArray = this.form.get(fieldId) as FormArray;
    const value = event.detail.value;
    const checked = event.detail.checked;

    if (checked) {
      // Add value to array if not already present
      if (!formArray.value.includes(value)) {
        formArray.push(this.fb.control(value));
      }
    } else {
      // Remove value from array
      const index = formArray.value.indexOf(value);
      if (index > -1) {
        formArray.removeAt(index);
      }
    }
  }

  isCheckboxChecked(fieldId: string, value: any): boolean {
    const formArray = this.form.get(fieldId) as FormArray;
    return formArray.value.includes(value);
  }

  shouldShowField(fieldId: string): boolean {
    if (fieldId === 'diabetes_type') {
      const diabetesControl = this.form.get('diabetes');
      return diabetesControl?.value === true;
    }
    return true;
  }

  private returnValid() {
    // Map the form values to match the MedicalHistoryDiseasesClass interface
    const formData = this.form.value;
    const medicalData: MedicalHistoryDiseasesClass = {
      isHypertensive: formData.hypertension || false,
      hasDiabetes: formData.diabetes || false,
      respiratory: formData.respiratory || false,
      cardiovascular: formData.cardiovascular || false,
      neurologic: formData.neurological || false,
      metabolic: formData.metabolic || false,
      psychiatric: formData.psychiatric || false,
      onchologic: formData.oncological || false,
      onchologicRespiratory: formData.oncological_types?.includes('respiratory') || null,
      onchologicGinecological: formData.oncological_types?.includes('gynecological') || null,
      onchologicNephrourological: formData.oncological_types?.includes('nephro_urological') || null,
      onchologicGastrointestinal: formData.oncological_types?.includes('gastrointestinal') || null,
      onchologicEndocrinal: formData.oncological_types?.includes('endocrine') || null,
      onchologicNeurological: formData.oncological_types?.includes('neurological') || null,
      gastrointestinal: formData.gastrointestinal || false,
      spine: formData.spinal_column || false,
      endocrinological: formData.endocrinological || false,
      infectious: formData.infectious || false,
      surgeries: formData.surgical || null,
      surgeriesDescription: formData.surgical_observations || null,
    };

    this.returnResponse.emit(medicalData);
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

  shouldShowSubfield(fieldId: string): boolean {
    const control = this.form.get(fieldId);
    return control?.value === true;
  }

  getVisibleFields() {
    if (this.currentStep) {
      return this.currentStep.fields.filter(field => field.id !== 'diabetes_type');
    }
    return [];
  }

  onRadioChange($event: IonRadioGroupCustomEvent<RadioGroupChangeEventDetail<any>>) {
    if ($event.target.name === 'diabetes') {
      const isTrue = $event.detail.value != false;
      this.form.get('diabetes_type')?.setValue($event.detail.value);
      this.form.get('diabetes')?.setValue(isTrue);
      this.form.updateValueAndValidity();
    }
  }
}
