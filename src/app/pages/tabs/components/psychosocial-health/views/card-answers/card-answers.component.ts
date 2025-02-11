import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { ISPSAnswers } from 'src/app/pages/tabs/interfaces/isps';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { ISPSService } from 'src/app/services/isps.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ANSWERS_LIST, EXTRA_ANSWERS_LIST } from '../../constants/answersList';

@Component({
  selector: 'app-card-answers',
  templateUrl: './card-answers.component.html',
  styleUrls: ['./card-answers.component.scss'],
  animations: [
    trigger('divAnimation', [
      state('hidden', style({ 
        height: '0',
        opacity: '0'
      })),
      state('visible', style({
        height: '*',
        opacity: '1'
      })),
      transition('hidden => visible', animate('500ms ease-in')),
      transition('visible => hidden', animate('500ms ease-out'))
    ])
  ]
})
export class CardAnswersComponent implements OnInit{

  ispsAnswers!: ISPSAnswers;
  ispsQuestions: any;
  desplegable : boolean = false
  translatesISPS!: any;
  user: User;
  answersList = ANSWERS_LIST;
  extraAnswersList = EXTRA_ANSWERS_LIST;

  utilsService = inject (UtilsService);
  ispsService = inject (ISPSService);
  storageService = inject (StorageService)

  constructor() {
    this.user = this.storageService.getSessionStorage<User>('user') !;
   }

  ngOnInit() {
    this.translatesISPS = this.utilsService.getLocalization('isps');
    this.getAnswers();
  }

  Dropdown(){
    this.desplegable = !this.desplegable
  }
 
  getAnswers(){
    this.ispsService.getIspsAnswers(this.user.id).subscribe((data)=>{
      this.ispsAnswers = data
    })
  }

}
