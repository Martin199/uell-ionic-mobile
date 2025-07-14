import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirstCardHydration, SecondCardHydration, ThirdCardHydration } from '../../const/feeding-const';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';
import { IonCard } from '@ionic/angular';

@Component({
  selector: 'app-step-one-feeding',
  templateUrl: './step-one-feeding.component.html',
  styleUrls: ['./step-one-feeding.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepOneFeedingComponent  implements OnInit {

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 1;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any[] =  Object.values(this.utilsService.getLocalizationByPath('nutrition', 'firtsCardHydration')!);
  secondCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardHydration')!);
  thirdCard: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'thirdCardHydration')!);
  questionsHydratation: any[] = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsHydratation')!);
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };
  fb = inject(FormBuilder)

  constructor(private utilsService: UtilsService) {
    this.firstFeedingForm = this.fb.group({

    })
  }

  ngOnInit() {
 
    console.log(this.questionsHydratation)

  }

  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    this.selectedIndexes[cardType] = index;

    let firstQuestion = this.selectedIndexes['first']! >= 0 ? Object.values(FirstCardHydration)[this.selectedIndexes['first']!] : '';
    let secondQuestion = this.selectedIndexes['second']! >= 0 ? Object.values(SecondCardHydration)[this.selectedIndexes['second']!] : '';
    let thirdQuestion = this.selectedIndexes['third']! >= 0 ? Object.values(ThirdCardHydration)[this.selectedIndexes['third']!] : '';
    firstQuestion === 'TRUE' ? this.drinksWaterAndInfusions = true : this.drinksWaterAndInfusions = false;
    firstQuestion === 'TRUE' ? this.dailyWaterIntake = true : this.dailyWaterIntake = false;


    switch (cardType) {
      case 'first':
        firstQuestion = Object.values(FirstCardHydration)[index];
        break;
      case 'second':
        secondQuestion = Object.values(SecondCardHydration)[index];
        break;
      case 'third':
        thirdQuestion = Object.values(ThirdCardHydration)[index];
        break;
    }

    const step1: any = {
      firstQuestionStep1: firstQuestion,
      secondQuestionStep1: secondQuestion,
      thirdQuestionStep1: thirdQuestion,
    };

    
    if (step1.firstQuestionStep1 === "TRUE" && step1.secondQuestionStep1 !== undefined && step1.thirdQuestionStep1 !== undefined) {
      this.firstStepReturn.emit(step1)
    } else if(step1.firstQuestionStep1 !== "TRUE") {
      step1.secondQuestionStep1 = null;
      step1.thirdQuestionStep1 = null;
      this.firstStepReturn.emit(step1)
    } else {
      this.firstStepReturn.emit(null)
    }


  }


}
