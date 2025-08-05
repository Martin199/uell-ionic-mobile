import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/core/state/user-state.service';

@Component({
  selector: 'app-form-isps-step-four',
  templateUrl: './form-isps-step-four.component.html',
  styleUrls: ['./form-isps-step-four.component.scss'],
  standalone: false,
})
export class FormIspsStepFourComponent implements OnInit {
  private userState = inject(UserStateService);
  private userData = this.userState.userData;
  private tenantParameters = this.userState.tenantParameters;
  responseISPS = input<any>();
  nameUsername = computed(() => this.userData()?.userAlias ?? this.userData()!.name);
  viewChoiceMessageThroughCellphone = computed(() => {
    if (
      this.tenantParameters()?.gestorWillContactYou === 'true' ||
      this.tenantParameters()?.gestorWillContactYou === 'false'
    ) {
      return false;
    }
    return true;
  });

  hiddenCardChoiceMessageThroughCellphone = computed(() => {
    if (
      this.tenantParameters()?.gestorWillContactYou === 'true' ||
      this.tenantParameters()?.gestorWillContactYou === 'false'
    ) {
      return false;
    }
    return true;
  });
  onboarding = input<boolean>(true);
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
      isChecked: [Validators.required],
    });
  }

  ngOnInit(): void {
    this.score = this.responseISPS().score;
    this.emocionalDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Emocional');
    this.fisicoDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Físico');
    this.socialDimension = this.responseISPS().dimentionDTO.find((dimension: any) => dimension.name === 'Social');
    this.formGestor.valueChanges.subscribe((resp: any) => {
      this._isChecked = resp.isChecked;
      this.isChecked.emit(this._isChecked);
    });
  }
}
