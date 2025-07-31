import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, IonContent } from '@ionic/angular/standalone';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
  IonModal,
  IonDatetime,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnBoardingBasicInfoPatch } from '../../../interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';

export interface BasicModalData {
  name: string;
  surname: string;
  alias: string;
  birthDate: string;
  docType: string;
  docNumber: string;
}

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonInput,
    IonModal,
    IonDatetime,
    SharedModule,
  ],
})
export class BasicModalComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private userStateService = inject(UserStateService);
  private userService = inject(UserService);

  name: string = '';
  surname: string = '';
  alias: string = '';
  birthDate: string = '';
  docType: string = '';
  docNumber: string = '';

  // Date picker properties
  isDatePickerOpen = false;
  displayDate: string = '';

  basicForm = this.formBuilder.group({
    name: [{ value: '', disabled: true }, [Validators.required]],
    surname: [{ value: '', disabled: true }, [Validators.required]],
    alias: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)],
    ],
    birthDate: ['', [Validators.required]],
    docType: [{ value: '', disabled: true }, [Validators.required]],
    docNumber: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit() {
    const userData = this.userStateService.userData();

    if (!userData) {
      console.warn('No user data available basic modal');
      return;
    }
    this.basicForm.patchValue({
      name: this.name || '',
      surname: this.surname || '',
      alias: this.alias || '',
      birthDate: this.birthDate || '',
      docType: this.docType || '',
      docNumber: this.docNumber || '',
    });

    // Initialize display date if birthDate exists
    if (this.birthDate) {
      const date = new Date(this.birthDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      this.displayDate = `${day}/${month}/${year}`;
    }
  }

  getControl(fieldName: string): FormControl {
    return this.basicForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    this.basicForm.markAllAsTouched();

    // Ensure bornDate is in YYYY-MM-DD format
    let formattedDate = '';
    if (this.basicForm.value.birthDate) {
      const date = new Date(this.basicForm.value.birthDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    }

    const body: OnBoardingBasicInfoPatch = {
      userAlias: this.basicForm.value.alias || '',
      bornDate: formattedDate,
    };
    if (this.basicForm.valid) {
      this.userService.postOnBoardingBasicInfo(body).subscribe(res => {
        this.userStateService.setUser(res);
      });
      this.modalCtrlr.dismiss(this.basicForm.value);
    } else {
      console.error('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }

  // Date picker methods
  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;

    if (selectedDate) {
      // Format the date for display (DD/MM/YYYY)
      const date = new Date(selectedDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      this.displayDate = `${day}/${month}/${year}`;
      this.basicForm.get('birthDate')?.setValue(selectedDate);
    }

    this.closeDatePicker();
  }
}
