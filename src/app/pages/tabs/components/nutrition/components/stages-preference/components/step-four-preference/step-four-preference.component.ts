import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesRestrictionsDTO } from '../../const/preference-interfaces';
import { StagesService } from '../../../services/stages.service';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-step-four-preference',
  templateUrl: './step-four-preference.component.html',
  styleUrls: ['./step-four-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgClass, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepFourPreferenceComponent  implements OnInit, OnChanges {

  utilsService = inject(UtilsService)
  storageService = inject(StorageService)
  stageServices = inject(StagesService)
  fb = inject(FormBuilder)
  
  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 1;
  }
  step = 0;
  hasSelect!: boolean;
  stepFourPreferenceForm!: FormGroup;
  test: any = { yes: "Si", no: "No" }
  firstCard: any = Object.values(this.test);
  secondCard: any = this.storageService.getSessionStorage('preferencesRestrictions');
  thirdCard: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardHydration'));
  questionsAllergy: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsAllergy'));
  showSecondCard!: boolean;
  dailyWaterIntake!: boolean;

  preferenceRestriction!: PreferencesRestrictionsDTO;
  selectedOptionIndexes: number[] = [];
  selectedOptionValues: string[] = [];
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  others!: string;
  firstQuestion!: any;
  constructor() { 
    this.stepFourPreferenceForm = this.fb.group({
      other: [""]
    })
  }

  ngOnChanges(): void {
    if (this.storageService.getSessionStorage('preferencesRestrictions')) {
      const PreferencesRestrictions: any = this.storageService.getSessionStorage('preferencesRestrictions');
      this.secondCard = PreferencesRestrictions.restrictionsList.filter((x: any) => x.section === 'ALERGIAS-INTOLERANCIAS')
    }
  }

  ngOnInit(): void {
    this.stepFourPreferenceForm.controls['other'].valueChanges.subscribe((resp: any) =>{
      this.others = resp
      const step1 = {
        firstQuestionStep4: this.firstQuestion,
        secondQuestionStep4: this.selectedOptionValues,
        thirdQuestionStep4: this.others
      };
      if (step1.firstQuestionStep4 && (step1.secondQuestionStep4.length > 0 || this.others !== "")) {
       
        this.firstStepReturn.emit(step1)
      } else{
        this.firstStepReturn.emit(null)
      }
    })
  }

  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    this.selectedIndexes[cardType] = index;


    this.firstQuestion = this.selectedIndexes['first']! >= 0 ? this.firstCard[this.selectedIndexes['first']!] : '';

    this.firstQuestion === 'Si' ? this.showSecondCard = true : this.showSecondCard = false;

    const step1 = {
      firstQuestionStep4: this.firstQuestion,
      secondQuestionStep4: this.selectedOptionValues,
      thirdQuestionStep4: this.others
    };
    if (step1.firstQuestionStep4 === "No") {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)

    }
  }

  selectOptionArray(index: number, value: any) {

    if (this.selectedOptionIndexes.includes(index)) {
      this.selectedOptionIndexes = this.selectedOptionIndexes.filter(i => i !== index);
      this.selectedOptionValues = this.selectedOptionValues.filter(v => v !== value.id);
    } else {
      this.selectedOptionIndexes.push(index);

      if (!this.selectedOptionValues.includes(value.id)) {
        this.selectedOptionValues.push(value.id);
      }
    }
    const step1 = {
      firstQuestionStep4: "Si",
      secondQuestionStep4: this.selectedOptionValues,
      thirdQuestionStep4: this.others
    };

    if (step1.firstQuestionStep4 && (step1.secondQuestionStep4.length > 0 || this.others)) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }
  }

}
