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
import { NutritionLifestyleData } from '../../../../interfaces';
import { NutritionLifestylePostData } from 'src/app/services/interfaces/auth-service.interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nutrition-lifestyle',
  templateUrl: './nutrition-lifestyle.component.html',
  styleUrls: ['./nutrition-lifestyle.component.scss'],
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
export class NutritionLifestyleComponent implements OnInit {
  returnResponse = output<NutritionLifestylePostData>();
  form!: FormGroup;
  formConfig = WELLNESS_QUESTIONNAIRE_FORM;
  currentStep = this.formConfig.steps.find(step => step.id === 'nutrition-lifestyle');
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
      healthy_nutrition: 0,
      processed_foods_consumption: 0,
      sugary_drinks_consumption: 0,
      adequate_sleep_hours: 0,
      difficulty_falling_asleep: 0,
      restorative_sleep: 0,
      work_involves_sitting: 0,
      daily_physical_activity: 0,
      weekly_sports_practice: 0,
    };

    this.form.patchValue(mockValues);
  }

  private returnValid() {
    const formData = this.form.value;
    const wellnessData: NutritionLifestylePostData = {
      properDiet: this.convertToNumber(formData.healthy_nutrition),
      fastfoodConsuming: this.convertToNumber(formData.processed_foods_consumption),
      sugarbasedDrinks: this.convertToNumber(formData.sugary_drinks_consumption),
      enoughSleep: this.convertToNumber(formData.adequate_sleep_hours),
      hardtimeSleeping: this.convertToNumber(formData.difficulty_falling_asleep),
      repairingSleep: this.convertToNumber(formData.restorative_sleep),
      sedentaryJob: this.convertToNumber(formData.work_involves_sitting),
      dailyPhysicalActivity: this.convertToNumber(formData.daily_physical_activity),
      sports: this.convertToNumber(formData.weekly_sports_practice),
      messageThroughCellphone: false, // Default value, should be set based on form data
      shortly: false, // Default value, should be set based on form data
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
