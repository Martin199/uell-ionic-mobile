import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { VegConsumption, VegDaysPerWeek, VegPortion } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-step-two-feeding',
  templateUrl: './step-two-feeding.component.html',
  styleUrls: ['./step-two-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepTwoFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardVegetables'));;
  secondCard:any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardVegetables'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardVegetables'));
  questionsVegetables: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsVegetables'));
  showSecondCard: boolean = false;
  showThirdCard: boolean = false;
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  constructor() {
   }

  ngOnInit() {
  }


  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    this.selectedIndexes[cardType] = index;

    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(VegConsumption)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(VegDaysPerWeek)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(VegPortion)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    firstQuestion === 'TRUE' ? this.showThirdCard = true : this.showThirdCard = false;

    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(VegConsumption)[index];
        break;
      case 'second':
        secondQuestion = Object.values(VegDaysPerWeek)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(VegPortion)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep2: firstQuestion,
      secondQuestionStep2: secondQuestion,
      thirdQuestionStep2: thirdQuestion,
    };


    if (step1.firstQuestionStep2 === "TRUE" && step1.secondQuestionStep2 !== undefined && step1.thirdQuestionStep2 !== undefined) {
      this.firstStepReturn.emit(step1)
    } else if(step1.firstQuestionStep2 !== "TRUE") {
      step1.secondQuestionStep2 = null;
      step1.thirdQuestionStep2 = null;
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }
  }
}
