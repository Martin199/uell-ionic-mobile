import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusForm } from 'src/app/shared/interface/shared-interfaces';
import { InitialClinicalData } from '../../interfaces';

@Component({
  selector: 'app-initial-clinical-data',
  templateUrl: './initial-clinical-data.component.html',
  styleUrls: ['./initial-clinical-data.component.scss'],
})
export class InitialClinicalDataComponent  implements OnInit {

  @Output() returnFormValid = new EventEmitter<StatusForm>();
	@Output() returnResponse = new EventEmitter<InitialClinicalData>();
  clinicalForm: FormGroup;
  fb = inject (FormBuilder);


  constructor() {
    this.clinicalForm = this.fb.group({
      takesMedication: [false, [Validators.required]],
      hadJobAccidents: [false, [Validators.required]],
      hadJobSickness: [false, [Validators.required]],
      hadPreviousJobs: [false, [Validators.required]],
      hadVaccines: [false, [Validators.required]]
    });
   }

  ngOnInit() {
    this.returnValid();
    this.formChanges();
  }

  formChanges() {
		this.clinicalForm.valueChanges.subscribe(() => {
			this.returnValid();
		});
	}

  private returnValid() {
			this.returnResponse.emit(this.clinicalForm.value);
	}


}
