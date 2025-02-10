import { Component, inject, OnInit, output,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Question } from '../interfaces/questions';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-isps-step-two',
  templateUrl: './form-isps-step-two.component.html',
  styleUrls: ['./form-isps-step-two.component.scss'],
})
export class FormIspsStepTwoComponent  implements OnInit {

  returnSecondStep = output<any>();
  validForm = output<boolean>();
  secondForm: FormGroup;
  translatesISPS: any;
  questions: Question[] = []
  utilsService = inject(UtilsService);

  constructor(private fb: FormBuilder, private apiUser: UserService) {
    this.secondForm = this.fb.group({
      energy: ['', Validators.required],
      concentrate: ['',Validators.required],
      confront: ['', Validators.required],
      comfortable: ['', Validators.required],
      comfortableGroup: ['', Validators.required],
      scared: ['', Validators.required],
      contained: ['', Validators.required],
      excluded: ['', Validators.required],
      alone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.translatesISPS = this.utilsService.getLocalization('isps')
    this.initQuestions();

    this.secondForm.valueChanges.subscribe(() => {
      if(this.secondForm.valid){
        this.validForm.emit(this.secondForm.valid) 
      }
    })
  }

  emitForm() {
    this.returnSecondStep.emit(this.secondForm.value);
  }

  initQuestions(){
    this.questions = [
      {
        question:this.translatesISPS.energy,
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
        fcName: 'energy'
      },
      {
        question:this.translatesISPS.concentrate,
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
        fcName: 'concentrate'
      },
      {
        question:this.translatesISPS.confront,
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
        fcName: 'confront'

      },
      {
        question:this.translatesISPS.comfortable,
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
        fcName: 'comfortable'

      },
      {
        question:this.translatesISPS['comfortable-group'],
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
        fcName: 'comfortableGroup'

      },
      {
        question:this.translatesISPS.scared,
        answerA: {
          label: this.translatesISPS.yes,
          value: 5
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 3
        },
        fcName: 'scared'

      },
      {
        question:this.translatesISPS.contained,
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
        fcName: 'contained'

      },
      {
        question:this.translatesISPS.excluded,
        answerA: {
          label: this.translatesISPS.yes,
          value: 1
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1.5
        },
        fcName: 'excluded'
      },
      {
        question:this.translatesISPS.alone,
        answerA: {
          label: this.translatesISPS.yes,
          value: 1
        },
        answerB: {
          label: this.translatesISPS.no,
          value: 0
        },
        answerC: {
          label: this.translatesISPS.sometimes,
          value: 1.5
        },
        fcName: 'alone'
      }
    ]
  }

}
