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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { COUNTRY_CODE } from 'src/app/shared/constant/country-constants';

export interface AddressModalData {
  country: string;
  province: any;
  department: any;
  address: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonSelect,
    IonSelectOption,
    SharedModule,
  ],
})
export class AddressModalComponent implements OnInit {
  private modalCtrlr = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  // Properties to receive data from componentProps
  country: string = '';
  province: any = null;
  department: any = null;
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';

  // Data arrays for selects
  countries = COUNTRY_CODE;
  provinces: any[] = [];
  departments: any[] = [];
  loadingProvinces = false;
  loadingDepartments = false;

  addressForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    province: [{ value: '', disabled: true }, [Validators.required]],
    department: [{ value: '', disabled: true }, [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
  });

  ngOnInit() {
    console.log('country:', this.country);
    console.log('province:', this.province);
    console.log('department:', this.department);
    console.log('address:', this.address);
    console.log('city:', this.city);
    console.log('state:', this.state);
    console.log('zip:', this.zip);

    this.addressForm.patchValue({
      country: this.country || '',
      province: this.province || '',
      department: this.department || '',
      address: this.address || '',
      city: this.city || '',
      state: this.state || '',
      zip: this.zip || '',
    });

    // Set up form change listeners
    this.setupFormListeners();

    // Load initial provinces if country is set
    if (this.country) {
      this.loadProvinces();
    }
  }

  setupFormListeners() {
    // When country changes, load provinces
    this.addressForm.get('country')?.valueChanges.subscribe(country => {
      this.addressForm.get('province')?.reset();
      this.addressForm.get('department')?.reset();
      this.provinces = [];
      this.departments = [];

      // Disable province and department when no country is selected
      if (!country) {
        this.addressForm.get('province')?.disable();
        this.addressForm.get('department')?.disable();
      } else {
        this.addressForm.get('province')?.enable();
        this.loadProvinces();
      }
    });

    // When province changes, load departments
    this.addressForm.get('province')?.valueChanges.subscribe((province: any) => {
      this.addressForm.get('department')?.reset();
      this.departments = [];

      // Disable department when no province is selected
      if (!province) {
        this.addressForm.get('department')?.disable();
      } else {
        this.addressForm.get('department')?.enable();
        if (typeof province === 'object' && province.id) {
          this.loadDepartments(province.id);
        }
      }
    });
  }

  loadProvinces() {
    this.loadingProvinces = true;
    this.userService.getAddressesState().subscribe({
      next: (res: any[]) => {
        this.provinces = res.map(province => ({
          ...province,
          name: province.name.toUpperCase(),
        }));
        this.loadingProvinces = false;
      },
      error: error => {
        console.error('Error loading provinces:', error);
        this.loadingProvinces = false;
      },
    });
  }

  loadDepartments(provinceId: string) {
    this.loadingDepartments = true;
    this.userService.getLocalitiesByState(provinceId).subscribe({
      next: (res: any[]) => {
        this.departments = res.map(department => ({
          ...department,
          name: department.name.toUpperCase(),
        }));
        this.loadingDepartments = false;
      },
      error: error => {
        console.error('Error loading departments:', error);
        this.loadingDepartments = false;
      },
    });
  }

  getControl(fieldName: string): FormControl {
    return this.addressForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      console.log('Form submitted:', this.addressForm.value);
      this.modalCtrlr.dismiss(this.addressForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
