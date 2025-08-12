import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { BreadPortion, BreadPresence, CarbPresence } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-step-four-feeding',
  templateUrl: './step-four-feeding.component.html',
  styleUrls: ['./step-four-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepFourFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup; 
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardCereals'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardCereals'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardCereals'));
  questionsCereals: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsCereals'));
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


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(CarbPresence)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(BreadPresence)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(BreadPortion)[this.selectedIndexes['third']!] : '';
    secondQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    secondQuestion === 'TRUE' ? this.showThirdCard = true : this.showThirdCard = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(CarbPresence)[index];
        break;
      case 'second':
        secondQuestion = Object.values(BreadPresence)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(BreadPortion)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep4: firstQuestion,
      secondQuestionStep4: secondQuestion,
      thirdQuestionStep4: thirdQuestion,
    };

 
    if((step1.secondQuestionStep4 !== "TRUE" && step1.secondQuestionStep4 !== undefined) && step1.firstQuestionStep4 !== undefined) {
      step1.thirdQuestionStep4 = null;
      this.firstStepReturn.emit(step1)
    } else if(step1.thirdQuestionStep4 && step1.secondQuestionStep4 === "TRUE" && step1.firstQuestionStep4) {
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)

    }


  }

}
