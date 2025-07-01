import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FruitConsumption, FruitDaysPerWeek, FruitPortion } from '../../const/feeding-const';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-step-three-feeding',
  templateUrl: './step-three-feeding.component.html',
  styleUrls: ['./step-three-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgFor,NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepThreeFeedingComponent  implements OnInit {

  utilsService = inject(UtilsService)
  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 2;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardFruit'));;
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardFruit'));
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardFruit'));
  questionsFruit: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionFruit'));
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


    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(FruitConsumption)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(FruitDaysPerWeek)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(FruitPortion)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'TRUE' ? this.showSecondCard = true : this.showSecondCard = false;
    firstQuestion === 'TRUE' ? this.showThirdCard = true : this.showThirdCard = false;
    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(FruitConsumption)[index];
        break;
      case 'second':
        secondQuestion = Object.values(FruitDaysPerWeek)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(FruitPortion)[index];
        break;
    }

    const step1 = {
      firstQuestionStep3: firstQuestion,
      secondQuestionStep3: secondQuestion,
      thirdQuestionStep3: thirdQuestion,
    };

    if (step1.firstQuestionStep3 === "TRUE" && step1.secondQuestionStep3 !== undefined && step1.thirdQuestionStep3 !== undefined) {
      this.firstStepReturn.emit(step1)
    } else if(step1.firstQuestionStep3 !== "TRUE") {
      step1.secondQuestionStep3 = '';
      step1.thirdQuestionStep3 = '';
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }

  }
  

}
