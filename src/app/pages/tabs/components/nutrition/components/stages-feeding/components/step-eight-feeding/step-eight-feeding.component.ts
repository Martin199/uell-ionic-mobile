import { NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DairyType, EggConsumption } from '../../const/feeding-const';
  
@Component({
  selector: 'app-step-eight-feeding',
  templateUrl: './step-eight-feeding.component.html',
  styleUrls: ['./step-eight-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepEightFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardDairy'));
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardDairy'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardCereals'));
  questionsDairy: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsDairy'));
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };

  constructor() { }

  ngOnInit() {}

  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    this.selectedIndexes[cardType] = index;


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(DairyType)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(EggConsumption)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(this.thirdCard)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'Sí, tomo agua e infusiones' ? this.drinksWaterAndInfusions = true : this.drinksWaterAndInfusions = false;
    secondQuestion ? this.dailyWaterIntake = true : this.dailyWaterIntake = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(DairyType)[index];
        break;
      case 'second':
        secondQuestion = Object.values(EggConsumption)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(this.thirdCard)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep8: firstQuestion,
      secondQuestionStep8: secondQuestion,
      thirdQuestionStep8: thirdQuestion,
    };


    if (step1.firstQuestionStep8 && step1.secondQuestionStep8) {
      this.firstStepReturn.emit(step1)
    }


  }

}
