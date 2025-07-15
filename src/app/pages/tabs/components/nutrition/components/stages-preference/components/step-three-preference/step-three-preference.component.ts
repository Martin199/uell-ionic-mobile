import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PreferencesRestrictionsDTO, RestrictionsList } from '../../const/preference-interfaces';
import { StagesService } from '../../../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Alcohol, AlcoholFirstCard } from '../../../stages-feeding/const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-three-preference',
  templateUrl: './step-three-preference.component.html',
  styleUrls: ['./step-three-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgClass, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepThreePreferenceComponent  implements OnInit, OnChanges {

  utilsService = inject(UtilsService)
  storageService = inject(StorageService)
  stageServices = inject(StagesService)
  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 1;
  }
  step = 0;
  preferenceRestriction!: PreferencesRestrictionsDTO
  restrictionsList: RestrictionsList[] = []
  selectedOptionIndexes: number[] = [];
  selectedOptionValues: string[] = [];
  showThirdCard!: boolean
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'first-preference-pathologies'));
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'second-preference-pathologies'));
  questionsPathologies: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsPathologies'));
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  firstQuestion!: any;
  secondQuestion!: any;
  shouldHasSelect!: boolean

  constructor() { }

  ngOnChanges(): void {
    this.getPreferencesRestrictions();
  }

  ngOnInit(): void {
    this.getPreferencesRestrictions();
  }

  getPreferencesRestrictions() {
    if (this.storageService.getSessionStorage('preferencesRestrictions')) {
      const PreferencesRestrictions: any = this.storageService.getSessionStorage('preferencesRestrictions');
      this.restrictionsList = PreferencesRestrictions.restrictionsList.filter((x: any) => x.section === 'ENFERMEDADES')
    }
  }

  shouldApplyHasSelect(i: number): boolean {
    return this.selectedOptionIndexes.includes(i);
  }


  selectOptionArray(index: number, value: any) {
    const lastIndex = this.restrictionsList.length - 1;
    if (index === lastIndex) {
      if (this.selectedOptionIndexes.includes(lastIndex)) {
        this.selectedOptionIndexes = [];
        this.selectedOptionValues = [];
      } else {
        this.selectedOptionIndexes = [lastIndex];
        this.selectedOptionValues = [value.id];
      }
    } else {
      if (this.selectedOptionIndexes.includes(lastIndex)) {
        this.selectedOptionIndexes = [];
        this.selectedOptionValues = [];
      }

      const selectedIndex = this.selectedOptionIndexes.indexOf(index);
      if (selectedIndex > -1) {
        this.selectedOptionIndexes.splice(selectedIndex, 1);
        this.selectedOptionValues = this.selectedOptionValues.filter(v => v !== value.id);
      } else {
        this.selectedOptionIndexes.push(index);
        this.selectedOptionValues.push(value.id);
      }
    }

    const step1 = {
      firstQuestionStep3: this.firstQuestion,
      secondQuestionStep3: this.secondQuestion,
      thirdQuestionStep3: this.selectedOptionValues
    };
    if (step1.thirdQuestionStep3.length > 0 && step1.firstQuestionStep3 === "NO" && !step1.secondQuestionStep3) {
      step1.secondQuestionStep3 = null;
      this.firstStepReturn.emit(step1);
    } else if (step1.thirdQuestionStep3.length > 0 && step1.firstQuestionStep3 === "Si" && step1.secondQuestionStep3) {
      this.firstStepReturn.emit(step1);
    } else {
      this.firstStepReturn.emit(null);
    }
  }


  selectOption(index: number, cardType: 'first' | 'second' | 'third', value?: any) {
    this.selectedIndexes[cardType] = index;

    this.firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(AlcoholFirstCard)[this.selectedIndexes['first']!] : '';
    this.secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(Alcohol)[this.selectedIndexes['second']!] : '';
    //let thirdQuestion = this.selectedIndexes['third'] >= 0 ? Object.values(ThirdCardHydration)[this.selectedIndexes['third']] : '';
    this.firstQuestion === 'Si' ? this.showThirdCard = true : this.showThirdCard = false;

    switch (cardType) {
      case 'first':
        this.firstQuestion = Object.values(AlcoholFirstCard)[index];
        break;
      case 'second':
        this.secondQuestion = Object.values(Alcohol)[index];
        break;
      case 'third':
        this.secondQuestion = value;
        break;

    }

    const step1 = {
      firstQuestionStep3: this.firstQuestion,
      secondQuestionStep3: this.secondQuestion,
      thirdQuestionStep3: this.selectedOptionValues
    };
    this.firstQuestion === 'NO' ? step1.secondQuestionStep3 = undefined : "";


    if (step1.thirdQuestionStep3.length > 0 && step1.firstQuestionStep3 === "NO" && !step1.secondQuestionStep3) {
      step1.firstQuestionStep3 === "NO" ? step1.secondQuestionStep3 = null : step1.secondQuestionStep3
      this.firstStepReturn.emit(step1)
    } else if (step1.thirdQuestionStep3.length > 0 && step1.firstQuestionStep3 === "Si" && step1.secondQuestionStep3) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }
  }


}
