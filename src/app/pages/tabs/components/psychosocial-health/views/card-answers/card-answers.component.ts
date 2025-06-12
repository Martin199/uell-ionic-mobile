import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { ISPSAnswers } from 'src/app/pages/tabs/interfaces/isps';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { ISPSService } from 'src/app/services/isps.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ANSWERS_LIST, EXTRA_ANSWERS_LIST } from '../../constants/answersList';
import { UserStateService } from 'src/app/core/state/user-state.service';

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
    ],
    standalone: false
})
export class CardAnswersComponent implements OnInit {

    ispsAnswers!: ISPSAnswers;
    ispsQuestions: any;
    desplegable: boolean = false
    translatesISPS!: any;
    answersList = ANSWERS_LIST;
    extraAnswersList = EXTRA_ANSWERS_LIST;
    userId: number | null = null;

    utilsService = inject(UtilsService);
    ispsService = inject(ISPSService);
    storageService = inject(StorageService)
    private userState = inject(UserStateService);

    constructor() {
        // this.user = this.storageService.getSessionStorage<User>('user')!;
        this.userId = this.userState.userId();
        if (!this.userId) {
            console.error('No se puede obtener el id del usuario');
            return;
        }
    }

    ngOnInit() {
        this.translatesISPS = this.utilsService.getLocalization('isps');
        this.getAnswers();
    }

    Dropdown() {
        this.desplegable = !this.desplegable
    }

    getAnswers() {
        this.ispsService.getIspsAnswers(this.userId!).subscribe((data) => {
            this.ispsAnswers = data
        })
    }

}
