import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { BreakfastType, CookingOilUsage, MealOrigin } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-ten-feeding',
  templateUrl: './step-ten-feeding.component.html',
  styleUrls: ['./step-ten-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgFor,NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepTenFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardFoodPreparation'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardFoodPreparation'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardFoodPreparation'));
  questionsFoodPreparation: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsFoodPreparation'));
  foordPreparation: any= this.utilsService.getLocalizationByPath('nutrition', 'thirdCardFoodPreparation');
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  selectedOptionIndexes: number[] = [];
  selectedOptionValues: string[] = [];
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  
  constructor() { }

  ngOnInit() {}

  selectOption(index: number, cardType: 'first' | 'second' | 'third', value?: any) {
    this.selectedIndexes[cardType] = index;

    if (cardType === "third" && value) {
      if (this.selectedOptionIndexes.includes(index)) {
        this.selectedOptionIndexes = this.selectedOptionIndexes.filter(i => i !== index);
        this.selectedOptionValues = this.selectedOptionValues.filter(v => v !== value);
      } else {
        this.selectedOptionIndexes.push(index);

        if (!this.selectedOptionValues.includes(value)) {
          this.selectedOptionValues.push(value);
        }
      }
    }

    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(MealOrigin)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(CookingOilUsage)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(BreakfastType)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'Sí, tomo agua e infusiones' ? this.drinksWaterAndInfusions = true : this.drinksWaterAndInfusions = false;
    secondQuestion ? this.dailyWaterIntake = true : this.dailyWaterIntake = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(MealOrigin)[index];
        break;
      case 'second':
        secondQuestion = Object.values(CookingOilUsage)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(BreakfastType)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep10: firstQuestion,
      secondQuestionStep10: secondQuestion,
      thirdQuestionStep10: thirdQuestion,
    };


    if (step1.firstQuestionStep10 && step1.secondQuestionStep10 && this.selectedOptionValues.length > 0) {
      step1.thirdQuestionStep10 = this.validThirdQuestion()
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }


  }

  validThirdQuestion(){
    const dairysFruits = this.foordPreparation?.['FoodPreparation-option-seven'];
    const mermeladeJuices = this.foordPreparation?.['FoodPreparation-option-eight'];
    const cookiesPuddingsButterBakery = this.foordPreparation?.['FoodPreparation-option-nine'];
    const options = this.selectedOptionValues;
    const hasDairysFruits = options.includes(dairysFruits);
    const hasMermeladeJuices = options.includes(mermeladeJuices);
    const hasCookiesPuddingsButterBakery = options.includes(cookiesPuddingsButterBakery);
  
    // Combinaciones
    if (hasDairysFruits && hasMermeladeJuices && hasCookiesPuddingsButterBakery) {
      return "ALL_OF_THEM";
    } else if (hasDairysFruits && hasMermeladeJuices) {
      return "DF_MJ";
    } else if (hasDairysFruits && hasCookiesPuddingsButterBakery) {
      return "DF_CPBB";
    } else if (hasMermeladeJuices && hasCookiesPuddingsButterBakery) {
      return "MJ_CPBB";
    } else if (hasDairysFruits) {
      return "DAIRYS_FRUITS";
    } else if (hasMermeladeJuices) {
      return "MERMELADE_JUICES";
    } else if (hasCookiesPuddingsButterBakery) {
      return "COOKIES_PUDDINGS_BUTTER_BAKERY";
    } else {
      return undefined;
    }
  }
}
