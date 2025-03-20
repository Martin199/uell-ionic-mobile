import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-information-second',
  templateUrl: './medical-information-second.component.html',
  styleUrls: ['./medical-information-second.component.scss'],
})
export class MedicalInformationSecondComponent implements OnInit {

  @Output() medicalInfoTwo = new EventEmitter<any>(); 
  isOncology: boolean = false;
  _hasSurgeries: boolean = false;

  formMedicalSecond = new FormGroup({
    mentalDisorders: new FormControl(''),
    oncology: new FormControl(''),
    gastrointestinal: new FormControl(''),
    spine: new FormControl(''),
    endocrinological: new FormControl(''),
    infectious: new FormControl(''),
    onchologicRespiratory: new FormControl(null),
    onchologicGinecological: new FormControl(null),
    onchologicNephrourological: new FormControl(null),
    onchologicGastrointestinal: new FormControl(null),
    onchologicEndocrinal: new FormControl(null),
    onchologicNeurological: new FormControl(null),
    surgeries: new FormControl(''),
    surgeriesDescription: new FormControl(null),
  })

  onchologicform = new FormGroup({
    onchologicRespiratory: new FormControl(null),
    onchologicGinecological: new FormControl(null),
    onchologicNephrourological: new FormControl(null),
    onchologicGastrointestinal: new FormControl(null),
    onchologicEndocrinal: new FormControl(null),
    onchologicNeurological: new FormControl(null),
  });

  ngOnInit(): void {
    this.emitCombinedData();

    this.formMedicalSecond.valueChanges.subscribe(() => {
      this.emitCombinedData();
    });

    this.onchologicform.valueChanges.subscribe(() => {
      if (this.isOncology) {
        this.emitCombinedData();
      }
    });
  }

  constructor() { }

  whichOncology(value: boolean) {
		this.isOncology = value === true ? true : false;
		if (!this.isOncology) {
			this.onchologicform.controls.onchologicRespiratory.setValue(null);
			this.onchologicform.controls.onchologicGinecological.setValue(null);
			this.onchologicform.controls.onchologicNephrourological.setValue(null);
			this.onchologicform.controls.onchologicGastrointestinal.setValue(null);
			this.onchologicform.controls.onchologicEndocrinal.setValue(null);
			this.onchologicform.controls.onchologicNeurological.setValue(null);
		}
    this.emitCombinedData();
	}

  hasSurgeries(value: boolean){
		value ? this._hasSurgeries = true : this._hasSurgeries = false;
    this.emitCombinedData();

	}

  private emitCombinedData() {
    let combinedData = { 
      ...this.formMedicalSecond.value, 
      onchologicInfo: this.isOncology ? this.onchologicform.value : null
    };
    this.medicalInfoTwo.emit(combinedData);
  }

}
