import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';

export interface WorkModalData {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-work-modal',
  templateUrl: './work-modal.component.html',
  styleUrls: ['./work-modal.component.scss'],
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, SharedModule],
})
export class WorkModalComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  private formBuilder = inject(FormBuilder);

  // Properties to receive data from componentProps
  company: string = '';
  position: string = '';
  startDate: string = '';
  endDate: string = '';

  workForm = this.formBuilder.group({
    company: ['', [Validators.required]],
    position: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  ngOnInit() {
    this.workForm.patchValue({
      company: this.company || '',
      position: this.position || '',
      startDate: this.startDate || '',
      endDate: this.endDate || '',
    });

    // Disable all form controls
    this.workForm.disable();
  }

  getControl(fieldName: string): FormControl {
    return this.workForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    this.workForm.markAllAsTouched();
    if (this.workForm.valid) {
      this.modalCtrlr.dismiss(this.workForm.value);
    } else {
      console.error('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
