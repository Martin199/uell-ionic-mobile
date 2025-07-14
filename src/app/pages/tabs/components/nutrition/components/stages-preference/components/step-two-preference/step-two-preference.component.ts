import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { PreferencesRestrictionsDTO } from '../../const/preference-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { DietPreferences } from '../../../stages-feeding/const/feeding-const';
import { NgClass } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagesService } from '../../../services/stages.service';

@Component({
  selector: 'app-step-two-preference',
  templateUrl: './step-two-preference.component.html',
  styleUrls: ['./step-two-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepTwoPreferenceComponent  implements OnInit {

  utilsService = inject(UtilsService)
  storageService = inject(StorageService)
  stageServices = inject(StagesService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'step-preference-feeding'));
  questionPreferenceFeeding: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionPreferenceFeeding'));
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  titles: string[] = ["Omnívora","Semi vegetariana","Vegetariana","Vegana"]
  preferenceRestriction!: PreferencesRestrictionsDTO;
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  stepFeeding: any;
  disabledDietOption1: boolean = false;
  disabledDietOption2: boolean = false;
  disabledDietOption3: boolean = false;
  disabledDietOption4: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (this.storageService.getSessionStorage('stepFeeding')) {this.stepFeeding = this.storageService.getSessionStorage('stepFeeding')}
    let fish: boolean = false;
    let redMeat: boolean = false;
    let chicken: boolean = false;
    if(this.stepFeeding.secondQuestionStep7) {
      fish = this.searchOptionMeats('Pescado');
      redMeat = this.searchOptionMeats('Carne roja');
      chicken = this.searchOptionMeats('Pollo');
    }
    this.stageServices.getPreferencesRestrictions().subscribe((resp: any) => {
      console.log(resp, 'getPreferencesRestrictions')
      this.preferenceRestriction = resp;
      sessionStorage.setItem('preferencesRestrictions', JSON.stringify(resp));
    })
    if (this.stepFeeding.firstQuestionStep2 === "TRUE" && this.stepFeeding.firstQuestionStep3 === "TRUE" && this.stepFeeding.firstQuestionStep7 === "TRUE"
      && this.stepFeeding.firstQuestionStep8 !== "NO_DAIRYS" && this.stepFeeding.secondQuestionStep8 !== "NO_EGGS" && fish && redMeat && chicken) {
        // Come todo
        this.disabledDietOption2 = true;
        this.disabledDietOption3 = true;
        this.disabledDietOption4 = true;
    } else if (this.stepFeeding.firstQuestionStep2 === "TRUE" && this.stepFeeding.firstQuestionStep3 === "TRUE" && this.stepFeeding.firstQuestionStep7 === "TRUE"
      && this.stepFeeding.firstQuestionStep8 !== "NO_DAIRYS" && this.stepFeeding.secondQuestionStep8 !== "NO_EGGS" && fish && !redMeat && !chicken) {
        // Come solo pescado de las carnes
        this.disabledDietOption1 = true;
        this.disabledDietOption3 = true;
        this.disabledDietOption4 = true;
    } else if (this.stepFeeding.firstQuestionStep2 === "TRUE" && this.stepFeeding.firstQuestionStep3 === "TRUE" && this.stepFeeding.firstQuestionStep7 === "NO_CONSUME"
      && this.stepFeeding.firstQuestionStep8 !== "NO_DAIRYS" && this.stepFeeding.secondQuestionStep8 !== "NO_EGGS") {
        // Come todo menos carne
        this.disabledDietOption1 = true;
        this.disabledDietOption2 = true;
        this.disabledDietOption4 = true;
    } else if (this.stepFeeding.firstQuestionStep2 === "TRUE" && this.stepFeeding.firstQuestionStep3 === "TRUE" && this.stepFeeding.firstQuestionStep7 === "NO_CONSUME"
      && this.stepFeeding.firstQuestionStep8 === "NO_DAIRYS" && this.stepFeeding.secondQuestionStep8 === "NO_EGGS") {
        // Come solo verduras y frutas
        this.disabledDietOption1 = true;
        this.disabledDietOption2 = true;
        this.disabledDietOption3 = true;
    }
  }


  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    if (this.disabledOption(index)) { return }
    this.selectedIndexes[cardType] = index;

    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(DietPreferences)[this.selectedIndexes['first']!] : '';

    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(DietPreferences)[index];
        break;
    }

    const step1 = {
      firstQuestionStep2: firstQuestion,

    };

    if (step1.firstQuestionStep2) {
      this.firstStepReturn.emit(step1)
    }
  }

  disabledOption(index: number) {
    switch(index) {
      case 0: return this.disabledDietOption1;
      case 1: return this.disabledDietOption2;
      case 2: return this.disabledDietOption3;
      case 3: return this.disabledDietOption4;
      default: return false;
    }
  }

  searchOptionMeats(type: string) {
    const OptionMeats = this.stepFeeding.secondQuestionStep7
    let typeMeat = OptionMeats.find((item: string) => {
      return item === type;
    });
    return typeMeat === type ? true : false;
  }

}
