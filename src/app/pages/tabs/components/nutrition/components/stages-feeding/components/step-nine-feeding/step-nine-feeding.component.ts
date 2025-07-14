import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { DressingConsumption, DressingPresence, SausageConsumption } from '../../const/feeding-const';
import { NgClass } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-step-nine-feeding',
  templateUrl: './step-nine-feeding.component.html',
  styleUrls: ['./step-nine-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepNineFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardUltraprocesados'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardUltraprocesados'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardUltraprocesados'));
  questionsUltraprocesados: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsUltraprocesados'));
  showSecondCard: boolean = false;
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


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(SausageConsumption)[this.selectedIndexes['first']!] : '';
    let secondQuestion: any = this.selectedIndexes['second']! >= 0 ? Object.values(DressingConsumption)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(DressingPresence)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(SausageConsumption)[index];
        break;
      case 'second':
        secondQuestion = Object.values(DressingConsumption)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(DressingPresence)[index];
        break;
    }
    firstQuestion === "NO_SAUSAGES" ? secondQuestion = undefined : secondQuestion;

    const step1: any = {
      firstQuestionStep9: firstQuestion,
      secondQuestionStep9: secondQuestion,
      thirdQuestionStep9: thirdQuestion,
    };

    if (step1.firstQuestionStep9 === "NO_SAUSAGES" && !step1.secondQuestionStep9 && step1.thirdQuestionStep9) {
      this.firstStepReturn.emit(step1);
    } else if (step1.firstQuestionStep9 === "TRUE" && step1.secondQuestionStep9 && step1.thirdQuestionStep9) {
      this.firstStepReturn.emit(step1);
    } else {
      this.firstStepReturn.emit(null)
    }
  }
}
