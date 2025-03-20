import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss'],
})
export class MedicalInformationComponent implements OnInit {
  @Output() medicalInfo = new EventEmitter<any>();

  formMedical = new FormGroup({
    arterialHypertension: new FormControl(''),
    diabetes: new FormControl(''),
    respiratory: new FormControl(''),
    cardiac: new FormControl(''),
    neurological: new FormControl(''),
    metabolice: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
    this.medicalInfo.emit(this.formMedical.value);
    this.formMedical.valueChanges.subscribe(values => {
      this.medicalInfo.emit(values);  
    });
  }

}
