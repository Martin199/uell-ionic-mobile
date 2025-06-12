import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-isps-step-four',
    templateUrl: './form-isps-step-four.component.html',
    styleUrls: ['./form-isps-step-four.component.scss'],
    standalone: false
})
export class FormIspsStepFourComponent implements OnInit {

    responseISPS = input<any>();
    nameUsername = input<string>();
    viewChoiceMessageThroughCellphone = input<boolean>();
    hiddenCardChoiceMessageThroughCellphone = input<boolean>(false);
    onboarding = input<boolean>(false);
    isChecked = output<string>();

    score: number = 0;
    emocionalDimension: any;
    fisicoDimension: any;
    socialDimension: any;
    formGestor!: FormGroup;
    _isChecked: string = 'false';

    fb = inject(FormBuilder);

    constructor() {
        this.formGestor = this.fb.group({
            isChecked: [Validators.required]
        })
    }

    ngOnInit(): void {

        this.score = this.responseISPS().score;
        this.emocionalDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Emocional');
        this.fisicoDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Físico');
        this.socialDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Social');
        this.formGestor.valueChanges.subscribe((resp: any) => {
            this._isChecked = resp.isChecked;
            this.isChecked.emit(this._isChecked);
        })
    }

}
