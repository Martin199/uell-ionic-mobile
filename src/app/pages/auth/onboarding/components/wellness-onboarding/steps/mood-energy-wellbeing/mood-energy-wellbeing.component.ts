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
import { WELLNESS_QUESTIONNAIRE_FORM } from '../../../../const/wellness-questionary.const';
import { MoodEnergyWellbeingPostData } from 'src/app/services/interfaces/auth-service.interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mood-energy-wellbeing',
  templateUrl: './mood-energy-wellbeing.component.html',
  styleUrls: ['./mood-energy-wellbeing.component.scss'],
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
export class MoodEnergyWellbeingComponent implements OnInit {
  returnResponse = output<MoodEnergyWellbeingPostData>();
  form!: FormGroup;
  formConfig = WELLNESS_QUESTIONNAIRE_FORM;
  currentStep = this.formConfig.steps.find(step => step.id === 'mood-energy-wellbeing');
  tenantParameters = inject(UserStateService).tenantParameters;

  // Debug properties for dev/qa environments
  private clickCount = 0;
  private readonly CLICKS_NEEDED = 5;
  private readonly isDevOrQa = environment.env === 'dev' || environment.env === 'qa';
  private clickTimeout: any = null;
  private readonly CLICK_TIMEOUT_MS = 1000;

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
    console.log(this.form.value);
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
      enjoy_daily_activities: 0,
      confidence_in_problem_solving: 0,
      life_perception_next_3_years: 0,
      mood_irritability: 0,
      impulsive_behavior: 0,
      frequent_arguments: 0,
      repetitive_episodes: 0,
      unable_to_relax: 0,
      worried_about_future: 0,
    };
    this.form.patchValue(mockValues);
  }

  private returnValid() {
    const formData = this.form.value;
    const wellnessData: MoodEnergyWellbeingPostData = {
      enjoyDailyActivities: this.convertToNumber(formData.enjoy_daily_activities),
      personalProblemsHandling: this.convertToNumber(formData.confidence_in_problem_solving),
      futureSelfProjecting: this.convertToNumber(formData.life_perception_next_3_years),
      moodSwings: this.convertToNumber(formData.mood_irritability),
      impulsive: this.convertToNumber(formData.impulsive_behavior),
      frequentlyArgue: this.convertToNumber(formData.frequent_arguments),
      anxiousMannerisms: this.convertToNumber(formData.repetitive_episodes),
      unableToRelax: this.convertToNumber(formData.unable_to_relax),
      worryFutureMisfortunes: this.convertToNumber(formData.worried_about_future),
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
