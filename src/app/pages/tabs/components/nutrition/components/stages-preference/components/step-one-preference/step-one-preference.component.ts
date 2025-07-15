import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { Objetive } from '../../../stages-feeding/const/feeding-const';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnthropometryDetailComponent } from '../../../../anthropometry-detail/anthropometry-detail.component';

@Component({
  selector: 'app-step-one-preference',
  templateUrl: './step-one-preference.component.html',
  styleUrls: ['./step-one-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgIf, NgClass, NgFor, AnthropometryDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepOnePreferenceComponent  implements OnInit {

  utilsService = inject(UtilsService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 1;
  }
  step = 0;
  hasSelect: boolean = false;
  firstFeedingForm!: FormGroup;
  firstCard: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'step-preference-goals'));
  secondCard: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'secondCardHydration'));
  questionsPreferencesGoals: any = Object.values(this.utilsService.getLocalizationByPath('nutrition', 'questionsPreferencesGoals'));
  objetive: any = Object.values(Objetive);
  drinksWaterAndInfusions: boolean = false;
  dailyWaterIntake: boolean = false;
  selectedIndexes: { [key: string]: number[] } = {
    first: [],
    second: [],
    third: [],
  };

  selectedEnumValues: { [key: string]: string[] } = {
    first: [],
    second: [],
    third: []
  };

  constructor() { }

  ngOnInit() {}

  selectOption(index: number, cardType: 'first' | 'second' | 'third') {
    const enumValue = this.objetive[index];
  
    if (this.selectedIndexes[cardType].includes(index)) {
      this.selectedIndexes[cardType] = this.selectedIndexes[cardType].filter(i => i !== index);
      this.selectedEnumValues[cardType] = this.selectedEnumValues[cardType].filter(v => v !== enumValue);
    } else {
      this.selectedIndexes[cardType].push(index);
      this.selectedEnumValues[cardType].push(enumValue);
    }

    const step1 = {
      firstQuestionStep1: this.selectedEnumValues[cardType],
    };

    if (this.selectedEnumValues[cardType].length > 0) {
      this.firstStepReturn.emit(step1);
    } else {
      this.firstStepReturn.emit(null);
    }
  }
  

}
