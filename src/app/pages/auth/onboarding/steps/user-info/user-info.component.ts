import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  userInfoForm = new FormGroup({
    birthDate: new FormControl('', [Validators.required]),
  });

  isOpen = false;
  displayDate = '';  
  storageService = new StorageService();
  user: User = this.storageService.getSessionStorage<User>('user')!;

  ngOnInit() {
    console.log(this.user);
    
    if (this.user?.bornDate) {
      const formattedDate = moment(this.user.bornDate).format('DD/MM/YYYY');
      this.userInfoForm.patchValue({ birthDate: formattedDate });
      this.updateDisplayDate(formattedDate);
    }

    this.userInfoForm.get('birthDate')?.valueChanges.subscribe((date) => {
     this.user.bornDate =  moment(date).format('DD/MM/YYYY');
    });
  }

  openDatePicker() {
    this.isOpen = true;
  }

  closeDatePicker() {
    this.isOpen = false;
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
  
    if (selectedDate) {
      // Formatear la fecha con Moment.js en formato dd/MM/yyyy
      const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
  
      // Guardar la fecha en el form en formato ISO (para validaciones o envíos de datos)
      this.userInfoForm.get('birthDate')?.setValue(selectedDate);
  
      // Mostrar la fecha formateada en el input
      this.displayDate = formattedDate;
    }
  
    this.closeDatePicker();
  }

  updateDisplayDate(date: string) {
    if (date) {
      this.displayDate = new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else {
      this.displayDate = '';
    }
  }

  getInitialBreakpoint(): number {
    const screenHeight = window.innerHeight;
  
    if (screenHeight < 600) {
      return 0.9; // En celulares pequeños, ocupa el 90%
    } else {
      return 0.7; // En pantallas más grandes, ocupa el 70%
    }
  }
  
  
  
}
