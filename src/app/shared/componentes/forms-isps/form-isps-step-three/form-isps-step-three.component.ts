import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../interfaces/questions';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-isps-step-three',
  templateUrl: './form-isps-step-three.component.html',
  styleUrls: ['./form-isps-step-three.component.scss'],
})
export class FormIspsStepThreeComponent  implements OnInit {
  
  returnThirdStep = output<any>();
  validForm = output<boolean>()
  thirdForm: FormGroup;
  translatesISPS: any;
  questions: Question[] = []

  constructor(private fb: FormBuilder, private utilsService: UtilsService) {
    this.thirdForm = this.fb.group({
      healthyFood: ['', Validators.required],
      junkFood: ['', Validators.required],
      sugar: ['', Validators.required],
      sleepEnough: ['',Validators.required],
      sleepDifficult: ['', Validators.required],
      restfulSleep: ['', Validators.required],
      sitting: ['', Validators.required],
      exercise: ['', Validators.required],
      sport: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.translatesISPS = this.utilsService.getLocalization('isps')
    this.initQuestions();

    this.thirdForm.valueChanges.subscribe(() => {
      if(this.thirdForm.valid){
        this.validForm.emit(this.thirdForm.valid) 
      }
    })
  }

  emitForm() {
    this.returnThirdStep.emit(this.thirdForm.value);
  }

  initQuestions(){
    this.questions = [
      {
        question:this.translatesISPS['healthy-food'],
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 5
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 3
        },
        fcName: 'healthyFood'
      },
      {
        question:this.translatesISPS['junk-food'],
        answerA: {
          label: this.translatesISPS.yes,
          value: 3
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1
        },
        fcName: 'junkFood'
      },
      {
        question:this.translatesISPS.sugar,
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 2
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1
        },
        fcName: 'sugar'

      },
      {
        question:this.translatesISPS['sleep-enough'],
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 3
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1
        },
        fcName: 'sleepEnough'

      },
      {
        question:this.translatesISPS['sleep-difficult'],
        answerA: {
          label: this.translatesISPS.yes,
          value: 7
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 5
        },
        fcName: 'sleepDifficult'

      },
      {
        question:this.translatesISPS['restful-sleep'],
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 5
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 3
        },
        fcName: 'restfulSleep'

      },
      {
        question:this.translatesISPS.sitting,
        answerA: {
          label: this.translatesISPS.yes,
          value: 2
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1
        },
        fcName: 'sitting'

      },
      {
        question:this.translatesISPS.exercise,
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 2
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1
        },
        fcName: 'exercise'
      },
      {
        question:this.translatesISPS.sport,
        answerA: {
          label: this.translatesISPS.yes,
          value: 0
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 1
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1.5
        },
        fcName: 'sport'
      }
    ]
  }
}
