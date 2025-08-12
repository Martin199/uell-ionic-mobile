import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SaltAddition, SaltMoment, SnacksConsumption } from '../../const/feeding-const';
import { NgClass } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-step-five-feeding',
  templateUrl: './step-five-feeding.component.html',
  styleUrls: ['./step-five-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class StepFiveFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardSalt'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardSalt'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardSalt'));
  questionsSalt: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsSalt'));
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


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(SaltAddition)[this.selectedIndexes['first']!] : '';
    let secondQuestion: any = this.selectedIndexes['second']! >= 0 ? Object.values(SaltMoment)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(SnacksConsumption)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    firstQuestion === 'TRUE' ? this.showThirdCard = true : this.showThirdCard = false;


    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(SaltAddition)[index];
        break;
      case 'second':
        secondQuestion = Object.values(SaltMoment)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(SnacksConsumption)[index];
        break;
    }
    firstQuestion === "NO_SALT" ? secondQuestion = undefined : secondQuestion;

    const step1: any = {
      firstQuestionStep5: firstQuestion,
      secondQuestionStep5: secondQuestion,
      thirdQuestionStep5: thirdQuestion,
    };
    if (step1.firstQuestionStep5 === "NO_SALT" && step1.thirdQuestionStep5 && !step1.secondQuestionStep5) {
      this.firstStepReturn.emit(step1)
    } else if (step1.firstQuestionStep5 === "TRUE" && step1.thirdQuestionStep5 && step1.secondQuestionStep5) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }
  }

}
