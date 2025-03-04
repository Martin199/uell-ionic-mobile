import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.scss'],
})
export class MedicalInformationComponent implements OnInit {

  formMedical = new FormGroup({
    arterialHypertension: new FormControl('', [Validators.required]),
    diabetes: new FormControl('', [Validators.required]),
    respiratory: new FormControl('', [Validators.required]),
    cardiac: new FormControl('', [Validators.required]),
    neurological: new FormControl('', [Validators.required]),
    metabolice: new FormControl('', [Validators.required]),
    diabetesType: new FormControl('', [Validators.required]),
    insulineRequiring: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit() { }

}
