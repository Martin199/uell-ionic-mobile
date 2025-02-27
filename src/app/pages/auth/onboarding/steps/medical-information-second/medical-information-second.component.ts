import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-information-second',
  templateUrl: './medical-information-second.component.html',
  styleUrls: ['./medical-information-second.component.scss'],
})
export class MedicalInformationSecondComponent  implements OnInit {

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
    surgeriesDescription: new FormControl(''),
  })

  constructor() { }

  ngOnInit() {}

}
