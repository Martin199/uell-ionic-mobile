import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-isps-step-one',
  templateUrl: './form-isps-step-one.component.html',
  styleUrls: ['./form-isps-step-one.component.scss'],
})
export class FormIspsStepOneComponent  implements OnInit {

  translatesISPS!: any;
  questions: any[] = []
  
  utilsService = inject(UtilsService);
  cdRef = inject(ChangeDetectorRef);

  firstForm = new FormGroup({
    irritable:new FormControl('', [Validators.required]),
    impulsive: new FormControl('', [Validators.required]),
    argued: new FormControl('', [Validators.required]),
    episodes: new FormControl('', [Validators.required]),
    unableRelax:new FormControl('', [Validators.required]),
    worried: new FormControl('', [Validators.required]),
    confidence: new FormControl('', [Validators.required]),
    threeYears: new FormControl('', [Validators.required]),
    enjoy: new FormControl('', [Validators.required]),
  })


  constructor() { }

  ngOnInit() {
    this.translatesISPS = this.utilsService.getLocalization('isps')
    this.initQuestions();

    this.firstForm.valueChanges.subscribe((res) => {
      console.log(res);
      this.cdRef.detectChanges();
    })
  }

  initQuestions() {
    const baseQuestions = [
      { key: 'irritable', fcName: 'irritable', values: [5, 0, 3] },
      { key: 'impulsive', fcName: 'impulsive', values: [2, 0, 1] },
      { key: 'argued', fcName: 'argued', values: [3, 0, 1] },
      { key: 'episodes', fcName: 'episodes', values: [5, 0, 3] },
      { key: 'unable-relax', fcName: 'unableRelax', values: [3, 0, 1] },
      { key: 'worried', fcName: 'worried', values: [7, 0, 5] },
      { key: 'confidence', fcName: 'confidence', values: [0, 7, 5] },
      { key: 'three-years', fcName: 'threeYears', options: [
        { labelKey: 'hope', value: 0 },
        { labelKey: 'hopeless', value: 3 }
      ]},
      { key: 'enjoy', fcName: 'enjoy', values: [0, 5, 3] }
    ];
  
    this.questions = baseQuestions.map(q => {
      const question = this.translatesISPS[q.key];
      const answers = q.options 
        ? q.options.map(option => ({
            label: this.translatesISPS[option.labelKey],
            value: option.value
          }))
        : ['yes', 'no', 'sometimes'].map((key, index) => ({
            label: this.translatesISPS[key],
            value: q.values[index]
          }));
  
      return { question, answerA: answers[0], answerB: answers[1], answerC: answers[2], fcName: q.fcName };
    });

    console.log(this.questions)  
  }


  selectOption(controlName: string, value: string) {
    this.firstForm.get(controlName)!.setValue(value);
  }
}
