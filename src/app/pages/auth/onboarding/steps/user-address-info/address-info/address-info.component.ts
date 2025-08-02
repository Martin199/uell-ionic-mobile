import { Component, computed, inject, Input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COUNTRY_ADDRESS_VALIDATIONS, countryENUM } from 'src/app/shared/constant/country-constants';
import { IAddressInfo, ICountryAddressValidation, IlocalitiesResponse, IStatesResponse } from 'src/app/shared/interface/country-interfaces';
import {
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController, IonContent } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { GoogleApisService } from 'src/app/services/google-apis.service';

@Component({
    selector: 'app-address-info',
    templateUrl: './address-info.component.html',
    styleUrls: ['./address-info.component.scss'],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonList,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
    ],
    standalone: true
})
export class AddressInfoComponent implements OnInit {

    private modalCtrlr = inject(ModalController);
    storageService = inject(StorageService);
    userService = inject(UserService);
    utilsService = inject(UtilsService);
    userState = inject(UserStateService);
    googleApisService = inject(GoogleApisService);

    @Input() addressId: number = 0;
    addressInfo = output<{ data: IAddressInfo; isValid: boolean }>();
    user!: User;
    tenantParameters = computed(() => this.userState.tenantParameters());
    provincesResponse: IStatesResponse[] = [];
    localitiesResponse: IlocalitiesResponse[] = [];
    //TODO: cambiar default luego de hacer las pruebas
    country: countryENUM = countryENUM.OTHER;
    countryValidations: ICountryAddressValidation = COUNTRY_ADDRESS_VALIDATIONS[countryENUM.OTHER];
    loadingLocality: boolean = false;
    countries: any[] = [];
    countryId: number = 1;

    addressForm = new FormGroup({
        street: new FormControl('', { validators: [Validators.required] }),
        number: new FormControl(''),
        floor: new FormControl(''),
        apartment: new FormControl(''),
        postalCode: new FormControl(''),
        country: new FormControl('', { validators: [Validators.required] }),
        province: new FormControl('', { validators: [Validators.required] }),
        locality: new FormControl('', { validators: [Validators.required] }),
        observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
    });

    constructor() { }

    ngOnInit() {
        this.setupFormListeners();
        this.setData();
        this.loadCountries();
        // this.loadStates();
        this.observerProvinceControl();
        // this.observerAddressInfoForm();
    }

    setupFormListeners() {
        this.addressForm.get('country')?.valueChanges.subscribe(country => {
          this.addressForm.get('province')?.reset();
          this.addressForm.get('department')?.reset();
          this.provincesResponse = [];
          this.localitiesResponse = [];
          if (!country) {
            this.addressForm.get('province')?.disable();
            this.addressForm.get('department')?.disable();
          } else {
            this.setValidations(country);
            this.addressForm.get('province')?.enable();
            this.loadStates(country);
            // this.loadProvinces(country);
          }
        });
    }

    setValidations(country: any) {
        this.countryId = country.id;
    }

    loadCountries() {
        this.userService.getAddressesCountry().subscribe({
          next: (res: any[]) => {
            this.countries = res.map(countries => ({
              ...countries,
              name: countries.countryName.charAt(0).toUpperCase() + countries.countryName.slice(1).toLowerCase()
            }));
          },
          error: error => {
            console.error('Error loading provinces:', error);
          },
          complete: () => {
          },
        });
    }

    private loadStates(country: any) {
        this.userService.getAddressesState(country.id).subscribe((res: IStatesResponse[]) => {
            res.forEach((e: IStatesResponse) => {
                e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1).toLowerCase()
            });
            this.provincesResponse = res;
            if (this.provincesResponse.length > 0) {
                this.addressForm.controls.province.enable();
            }
        });
    }

    setData() {
        this.user = this.utilsService.getUser();
        const countryEnum = this.utilsService.findCountryEnum(this.tenantParameters()?.country ?? countryENUM.ARGENTINA);
        this.country = countryEnum;
        this.setCountryValidation(this.country);
    }

    setCountryValidation(country: countryENUM) {
        this.countryValidations = COUNTRY_ADDRESS_VALIDATIONS[country];
        this.selectCountryAddressForm();
    }

    selectCountryAddressForm() {
        switch (this.country) {
            case countryENUM.ARGENTINA:
                this.addressForm.clearValidators();
                this.formConfigArgentina();
                break;

            case countryENUM.COLOMBIA:
                this.addressForm.clearValidators();
                this.formConfigColombia();
                break;

            case countryENUM.PERU: //Se puede omitir
                this.addressForm.clearValidators();
                this.formConfigPeru();
                break;

            case countryENUM.ECUADOR:
                //TODO: Agregar validaciones de Ecuador
                // this.addressForm.clearValidators();
                this.formConfigEcuador();
                break;

            case countryENUM.OTHER:
                break;

            default:
                break;
        }
    }

    //TODO: simplificar en un solo metodo la configuracion del formulario usando COUNTRY_ADDRESS_VALIDATIONS[countryENUM.OTHER]
    formConfigArgentina() {
        this.addressForm.get('street')?.setValidators([
            Validators.required,
            Validators.pattern(COUNTRY_ADDRESS_VALIDATIONS.ARGENTINA.street.pattern),
        ]);
        this.addressForm.get('street')?.updateValueAndValidity();
        this.addressForm.get('number')?.setValidators([
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern(/^[0-9]+$/),
        ]);
        this.addressForm.get('number')?.updateValueAndValidity();
        this.addressForm.get('floor')?.setValidators([
            Validators.maxLength(3),
            Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]);
        this.addressForm.get('floor')?.updateValueAndValidity();
        this.addressForm.get('apartment')?.setValidators([
            Validators.maxLength(3),
            Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]);
        this.addressForm.get('apartment')?.updateValueAndValidity();
        this.addressForm.get('postalCode')?.setValidators([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(5),
            Validators.pattern(/^[0-9]+$/),
        ]);
        this.addressForm.get('postalCode')?.updateValueAndValidity();
        this.addressForm.get('province')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('province')?.updateValueAndValidity();
        this.addressForm.get('locality')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('locality')?.updateValueAndValidity();
        this.addressForm.get('observation')?.setValidators([
            Validators.maxLength(250),
        ]);
    }

    formConfigColombia() {
        this.addressForm.get('street')?.setValidators([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.\-#\s]+$/),
        ]);
        this.addressForm.get('street')?.updateValueAndValidity();
        this.addressForm.get('number')?.setValidators([
            Validators.maxLength(56),
            Validators.pattern(/^[a-zA-Z0-9\-#\s]+$/),
        ]);
        this.addressForm.get('number')?.updateValueAndValidity();
        this.addressForm.get('floor')?.setValidators([
            Validators.pattern(/^[a-zA-Z0-9]+$/),
            Validators.maxLength(3),
        ]);
        this.addressForm.get('floor')?.updateValueAndValidity();
        this.addressForm.get('apartment')?.setValidators([
            Validators.pattern(/^[a-zA-Z0-9]+$/),
            Validators.maxLength(3),
        ]);
        this.addressForm.get('apartment')?.updateValueAndValidity();
        this.addressForm.get('postalCode')?.setValidators([
            Validators.pattern(/^[0-9]+$/),
            Validators.maxLength(6),
            Validators.minLength(6),
        ]);
        this.addressForm.get('postalCode')?.updateValueAndValidity();
        this.addressForm.get('province')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('province')?.updateValueAndValidity();
        this.addressForm.get('locality')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('locality')?.updateValueAndValidity();
        this.addressForm.get('observation')?.setValidators([
            Validators.maxLength(250),
        ]);
        this.addressForm.get('observation')?.updateValueAndValidity();
    }

    formConfigPeru() {
        this.addressForm.get('street')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('street')?.updateValueAndValidity();
        this.addressForm.get('number')?.setValidators([
        ]);
        this.addressForm.get('number')?.updateValueAndValidity();
        this.addressForm.get('floor')?.setValidators([
        ]);
        this.addressForm.get('floor')?.updateValueAndValidity();
        this.addressForm.get('apartment')?.setValidators([
        ]);
        this.addressForm.get('apartment')?.updateValueAndValidity();
        this.addressForm.get('postalCode')?.setValidators([
            Validators.minLength(5),
            Validators.pattern(/^[0-9]+$/),
        ]);
        this.addressForm.get('postalCode')?.updateValueAndValidity();
        this.addressForm.get('province')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('province')?.updateValueAndValidity();
        this.addressForm.get('locality')?.setValidators([
            Validators.required,
        ]);
        this.addressForm.get('locality')?.updateValueAndValidity();
        this.addressForm.get('observation')?.setValidators([
            Validators.maxLength(250),
        ]);
    }

    formConfigEcuador() {
    }

    private observerProvinceControl() {
        this.addressForm.get('province')?.valueChanges.subscribe(() => {
            this.loadingLocality = true;
            this.addressForm.get('locality')?.reset();
            this.localitiesResponse = [];
            const value = this.addressForm.get('province')?.value as any;
            const id = value?.id + '';
            // this.addressForm.get('locality')?.disable();
            if (value?.id) {
                this.userService.getLocalitiesByState(id).subscribe((res: IlocalitiesResponse[]) => {
                    res.forEach((e: IlocalitiesResponse) => {
                        e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1).toLowerCase()
                        this.localitiesResponse.push(e);
                    });
                    if (this.localitiesResponse.length > 0) {
                        this.addressForm.get('locality')?.updateValueAndValidity();
                        this.loadingLocality = false;
                    }
                });
            }
        });
    }

    // observerAddressInfoForm() {
    //     this.addressForm.valueChanges.subscribe((value) => {
    //         this.emitAddressInfo(value);
    //     });
    // }

    postAddress() {
        this.builAddressInfo(this.addressForm.value);
    }

    async builAddressInfo(formValue: any) {
        const contactInfo: IAddressInfo = {
            street: formValue.street,
            number: formValue.number,
            floor: formValue.floor,
            apartment: formValue.apartment,
            postalCode: formValue.postalCode,
            province: formValue.province,
            locality: formValue.locality,
            observation: formValue.observation,
        };
        // this.validacionGoogleMaps(contactInfo);
        const confirmAddress: any = await this.validacionGoogleMaps(contactInfo);
        if (confirmAddress) {
            this.patchAddress();
        } else {

        }
    }

    validacionGoogleMaps(addressInfo: IAddressInfo) {
        return this.googleApisService.validacionGoogleMaps(addressInfo);
    }

    patchAddress() {
        const body = this.googleApisService.getAddressPayload();
        if (!body) {
            console.error('No address payload found');
            return;
        }
        this.userService.patchOnBoardingAddress(body, this.addressId).subscribe({
          next: () => {
            this.postCountry();
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {},
        });
    }

    postCountry() {
        //TODO: arreglar posteo de countryId
        this.userService.postOnBoardingCountry(this.countryId).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            this.dismiss();
          },
        });
    }

    dismiss() {
        this.modalCtrlr.dismiss();
    }

}
