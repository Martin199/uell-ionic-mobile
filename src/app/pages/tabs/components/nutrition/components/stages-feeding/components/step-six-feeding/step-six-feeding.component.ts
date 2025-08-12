import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { SugarQuantity, SugarAddition, SweetFoodConsumption } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-step-six-feeding',
  templateUrl: './step-six-feeding.component.html',
  styleUrls: ['./step-six-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepSixFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardSugar'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardSugar'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardSugar'));
  questionsSugar: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsSugar'));
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  showSecondCard: boolean = false;
  showThirdCard: boolean = false;
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };


  constructor() { }

  ngOnInit() {}

  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    this.selectedIndexes[cardType] = index;


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(SweetFoodConsumption)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(SugarAddition)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(SugarQuantity)[this.selectedIndexes['third']!] : '';
    secondQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    secondQuestion === 'TRUE' ? this.showThirdCard = true : this.showThirdCard = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(SweetFoodConsumption)[index];
        break;
      case 'second':
        secondQuestion = Object.values(SugarAddition)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(SugarQuantity)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep6: firstQuestion,
      secondQuestionStep6: secondQuestion,
      thirdQuestionStep6: thirdQuestion,
    };


 
    if((step1.secondQuestionStep6 !== "TRUE" && step1.secondQuestionStep6 !== undefined) && step1.firstQuestionStep6 !== undefined) {
      step1.thirdQuestionStep6 = null;
      this.firstStepReturn.emit(step1)
    } else if(step1.thirdQuestionStep6 && step1.secondQuestionStep6 === "TRUE" && step1.firstQuestionStep6) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)

    }

  }

}
