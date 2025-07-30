import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
} from '@ionic/angular/standalone';
import { WELLNESS_QUESTIONNAIRE_FORM } from '../../../../const/wellness-questionary.const';
import { EnergyConcentrationPostData } from 'src/app/services/interfaces/auth-service.interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-energy-concentration',
  templateUrl: './energy-concentration.component.html',
  styleUrls: ['./energy-concentration.component.scss'],
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
export class EnergyConcentrationComponent implements OnInit {
  returnResponse = output<EnergyConcentrationPostData>();
  form!: FormGroup;
  formConfig = WELLNESS_QUESTIONNAIRE_FORM;
  currentStep = this.formConfig.steps.find(step => step.id === 'energy-concentration');
  tenantParameters = inject(UserStateService).tenantParameters;

  // Debug properties for dev/qa environments
  private clickCount = 0;
  private readonly CLICKS_NEEDED = 5;
  private readonly isDevOrQa = environment.env === 'dev' || environment.env === 'qa';
  private clickTimeout: any = null;
  private readonly CLICK_TIMEOUT_MS = 1000; // 1 second timeout between clicks

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const formControls: { [key: string]: any } = {};

    if (this.currentStep) {
      this.currentStep.fields.forEach(field => {
        formControls[field.id] = ['', field.required ? Validators.required : null];
      });
    }

    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.form.valid) {
      this.returnValid();
    }
  }

  isFieldValid(fieldId: string): boolean {
    const field = this.form.get(fieldId);
    return field ? field.invalid && field.touched : false;
  }

  // Method to handle field clicks for dev/qa debugging
  onFieldClick() {
    if (!this.isDevOrQa) return;

    // Clear existing timeout
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    this.clickCount++;

    // Set timeout to reset counter if no more clicks within the time window
    this.clickTimeout = setTimeout(() => {
      this.clickCount = 0;
      this.clickTimeout = null;
    }, this.CLICK_TIMEOUT_MS);

    if (this.clickCount >= this.CLICKS_NEEDED) {
      // Clear timeout since we've reached the target
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      }
      this.fillAllQuestionnaireValues();
      this.clickCount = 0; // Reset counter
    }
  }

  // Method to fill all questionnaire values (dev/qa only)
  private fillAllQuestionnaireValues() {
    if (!this.isDevOrQa) return;

    console.log(
      `%c
  (__)  (__)  (__)  (__)  (__)
  (oo)  (oo)  (oo)  (oo)  (oo)
 /----\\/----\\/----\\/----\\/----\\
| C++ | C++ | C++ | C++ | C++ |
 \\----/\\----/\\----/\\----/\\----/
  ^^   ^^   ^^   ^^   ^^   ^^
Secret auto-fill feature unlocked! 🐄`,
      'color: #4ecdc4; font-size: 14px; font-weight: bold; font-family: monospace;'
    );

    const mockValues = {
      sufficient_energy_daily_tasks: 0,
      adequate_concentration: 0,
      feeling_unable_to_cope: 0,
      feeling_comfortable_with_opposite_sex: 0,
      feeling_comfortable_with_unknown_people: 0,
      feeling_scared_or_frightened: 0,
      feeling_united_with_close_people: 0,
      feeling_excluded: 0,
      feeling_lonely_in_group: 0,
    };

    this.form.patchValue(mockValues);
  }

  private returnValid() {
    const formData = this.form.value;
    const wellnessData: EnergyConcentrationPostData = {
      energyForDailyTasks: this.convertToNumber(formData.sufficient_energy_daily_tasks),
      properlyFocus: this.convertToNumber(formData.adequate_concentration),
      cantFaceAllToDo: this.convertToNumber(formData.feeling_unable_to_cope),
      comfortabilityOppositeSexSmalltalk: this.convertToNumber(formData.feeling_comfortable_with_opposite_sex),
      comfortabilityUnknownGroup: this.convertToNumber(formData.feeling_comfortable_with_unknown_people),
      feelMostTimeAfraid: this.convertToNumber(formData.feeling_scared_or_frightened),
      feelUnionCloseCircle: this.convertToNumber(formData.feeling_united_with_close_people),
      feelLeftBehind: this.convertToNumber(formData.feeling_excluded),
      feelAloneInGroup: this.convertToNumber(formData.feeling_lonely_in_group),
    };

    this.returnResponse.emit(wellnessData);
  }

  private convertToNumber(value: any): number {
    if (value === true || value === 'always') return 1;
    if (value === false || value === 'never') return 0;
    if (value === 'sometimes') return 0.5;
    return 0;
  }
}
