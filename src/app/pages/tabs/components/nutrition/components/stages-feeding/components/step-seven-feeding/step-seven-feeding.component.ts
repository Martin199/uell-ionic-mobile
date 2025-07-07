import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { ChickenFrequency, FishFrequency, MeatConsumption, MeatFrequency } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-seven-feeding',
  templateUrl: './step-seven-feeding.component.html',
  styleUrls: ['./step-seven-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgFor,NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepSevenFeedingComponent  implements OnInit {
  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardMeats'));
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardMeats'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardMeats'));
  fourCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'fourthCardMeats'));
  fiveCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'fiveCardMeats'));
  questionsMeats: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsMeats'));
  secondFoordPreparation: any= this.utilsService.getLocalizationByPath('nutrition', 'secondCardMeats');
  redMeat = this.secondFoordPreparation['Meats-option-three'];
  chicken = this.secondFoordPreparation['Meats-option-four'];
  fish = this.secondFoordPreparation['Meats-option-five'];
  showSecondCard: boolean = false;
  showThirdCard: boolean = false;
  showfourthCard: boolean = false;
  showfifthCard: boolean = false;
  selectedOptionIndexes: number[] = [];
  selectedOptionValues: string[] = [];
  secondQuestion: any[] = [];
  thirdQuestion: any;
  fourQuestion: any;
  fiveQuestion: any;
  firstQuestion: any;
  typeMeat: string = '';

  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
  };

  constructor() { }

  ngOnInit() {}
  selectOptionArray(index: number, value: any) {
    this.typeMeat = value;
    if (this.selectedOptionIndexes.includes(index)) {
      this.selectedOptionIndexes = this.selectedOptionIndexes.filter(i => i !== index);
      this.selectedOptionValues = this.selectedOptionValues.filter(v => v !== value);
    } else {
      this.selectedOptionIndexes.push(index);

      if (!this.selectedOptionValues.includes(value)) {
        this.selectedOptionValues.push(value);
      }
    }

    if (value === this.redMeat) {
      this.showThirdCard = !this.showThirdCard;
    }
    if (value === this.chicken) {
      this.showfourthCard = !this.showfourthCard;
    }
    if (value === this.fish) {
      this.showfifthCard = !this.showfifthCard;
    }

    const step1 = {
      firstQuestionStep7: this.firstQuestion,
      secondQuestionStep7: this.selectedOptionValues,
      thirdQuestionStep7: this.thirdQuestion,
      fourQuestionStep7: this.fourQuestion,
      fiveQuestionStep7: this.fiveQuestion
    };
    if (step1.firstQuestionStep7 === "NO_CONSUME") {
      this.showSecondCard = false
      this.showThirdCard = false;
      this.showfourthCard = false;
      this.showfifthCard = false;
      step1.secondQuestionStep7 = []
      this.firstStepReturn.emit(step1)
    } else if (step1.firstQuestionStep7 && (this.selectedOptionValues.length > 0 && this.validationSecondCard())) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }

  }

  selectOption(index: number, cardType: 'first' | 'second' | 'third' | 'fourth' | 'fifth') {
    this.selectedIndexes[cardType] = index;

    this.firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(MeatConsumption)[this.selectedIndexes['first']!] : '';
    this.thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(MeatFrequency)[this.selectedIndexes['third']!] : '';
    this.fourQuestion = this.selectedIndexes['fourth']! >= 0 ? Object.values(ChickenFrequency)[this.selectedIndexes['fourth']!] : '';
    this.fiveQuestion = this.selectedIndexes['fifth']! >= 0 ? Object.values(FishFrequency)[this.selectedIndexes['fifth']!] : '';
    this.firstQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;

    switch (cardType) {
      case 'first':
        this.firstQuestion = Object.values(MeatConsumption)[index];
        break;
      case 'third':
        this.thirdQuestion = Object.values(MeatFrequency)[index];
        break;
      case 'fourth':
        this.fourQuestion = Object.values(ChickenFrequency)[index];
        break;
      case 'fifth':
        this.fiveQuestion = Object.values(FishFrequency)[index];
        break;
    }
    const step1 = {
      firstQuestionStep7: this.firstQuestion,
      secondQuestionStep7: this.selectedOptionValues,
      thirdQuestionStep7: this.thirdQuestion,
      fourQuestionStep7: this.fourQuestion,
      fiveQuestionStep7: this.fiveQuestion
    };

    if (this.firstQuestion === 'TRUE' && cardType === 'first') {
      this.showSecondCard = true
      step1.thirdQuestionStep7 = null;
      step1.fourQuestionStep7 = null;
      step1.fiveQuestionStep7 = null; 
      this.selectedOptionIndexes = [];
    } 

    if (step1.firstQuestionStep7 === "NO_CONSUME") {
      this.showThirdCard = false;
      this.showfourthCard = false;
      this.showfifthCard = false;
      this.selectedOptionValues = []
      step1.secondQuestionStep7 = []
      this.firstStepReturn.emit(step1)
    } else if (step1.firstQuestionStep7 && (this.selectedOptionValues.length > 0 && this.validationSecondCard())) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }
  }

  validationSecondCard(): boolean {
    if (this.selectedOptionValues.includes(this.redMeat) && this.selectedOptionValues.includes(this.chicken) && this.selectedOptionValues.includes(this.fish) &&
      (this.thirdQuestion && this.fourQuestion && this.fiveQuestion)) {
      return true
    } else if (this.selectedOptionValues.length === 2) {
      if (this.selectedOptionValues.includes(this.redMeat) && this.selectedOptionValues.includes(this.chicken) &&
        (this.thirdQuestion && this.fourQuestion)) {
        return true
      } else if (this.selectedOptionValues.includes(this.redMeat) && this.selectedOptionValues.includes(this.fish) &&
        (this.thirdQuestion && this.fiveQuestion)) {
        return true
      } else if (this.selectedOptionValues.includes(this.chicken) && this.selectedOptionValues.includes(this.fish) &&
        (this.fourQuestion && this.fiveQuestion)) {
        return true
      }
    }
    else if (this.selectedOptionValues.length === 1) {
      if (this.selectedOptionValues.includes(this.chicken) && this.fourQuestion) {
        return true;
      } else if (this.selectedOptionValues.includes(this.redMeat) && this.thirdQuestion) {
        return true;
      } else if (this.selectedOptionValues.includes(this.fish) && this.fiveQuestion) {
        return true;
      }
    }
    return false;
  }
}