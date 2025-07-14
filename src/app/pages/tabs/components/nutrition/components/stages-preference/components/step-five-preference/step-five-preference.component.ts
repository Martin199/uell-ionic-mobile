import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { KitchenUtensilsList } from '../../const/preference-interfaces';
import { StagesService } from '../../../services/stages.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NgClass } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-step-five-preference',
  templateUrl: './step-five-preference.component.html',
  styleUrls: ['./step-five-preference.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepFivePreferenceComponent  implements OnInit, OnChanges{

  utilsService = inject(UtilsService)
  storageService = inject(StorageService)
  stageServices = inject(StagesService)

  @Output() firstStepReturn = new EventEmitter();
  @Input() set currentSlide(value: number) {
    this.step = value ? value : 1;
  }
  step: number = 0;
  selectedOptionIndexes: number[] = [];
  selectedOptionValues: string[] = [];
  kitchenUtensilsList!: KitchenUtensilsList[];
  selectedIndexes: { [key: string]: number | null } = {
    first: null,
    second: null,
    third: null,
  };


  constructor() { }
  ngOnChanges(): void {
    this.getPreferencesRestrictions()
  }

  ngOnInit(): void {
    this.getPreferencesRestrictions()
  }

  getPreferencesRestrictions(){
    if (this.storageService.getSessionStorage('preferencesRestrictions')) {
      const PreferencesRestrictions: any = this.storageService.getSessionStorage('preferencesRestrictions');
      this.kitchenUtensilsList = PreferencesRestrictions.kitchenUtensilsList
    }
  }

  selectOptionArray(index: number, value: any) {
    
    if (this.selectedOptionIndexes.includes(index)) {
        this.selectedOptionIndexes = this.selectedOptionIndexes.filter(i => i !== index);
        this.selectedOptionValues = this.selectedOptionValues.filter(v => v !== value.id);
    } else {
        this.selectedOptionIndexes.push(index);
        
        if (!this.selectedOptionValues.includes(value.id)) {
            this.selectedOptionValues.push(value.id);
        }
    }

    const step1 = {
      firstQuestionStep5: this.selectedOptionValues,
    };
    this.firstStepReturn.emit(step1)
}

}
