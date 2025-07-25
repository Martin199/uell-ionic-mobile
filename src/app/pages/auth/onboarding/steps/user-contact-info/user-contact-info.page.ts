import { Component, Inject, inject, HostListener, OnDestroy, output } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { TenantParameters, TenantParametersResponse } from 'src/app/core/interfaces/tenantParameters';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COUNTRY_CODE, COUNTRY_PHONE_VALIDATIONS, countryENUM } from 'src/app/shared/constant/country-constants';
import { IContactInfo, ICountryCode } from 'src/app/shared/interface/country-interfaces';
@Component({
    selector: 'app-user-contact-info',
    templateUrl: './user-contact-info.page.html',
    styleUrls: ['./user-contact-info.page.scss'],
    standalone: false
})
export class UserContactInfoPage implements OnDestroy {

    utilsService = inject(UtilsService);
    storageService = inject(StorageService);
    fb = inject(FormBuilder);
    public modalCtrl = Inject(ModalController);
    userState = inject(UserStateService);

    contactInfo = output<{ data: IContactInfo; isValid: boolean }>();
    user!: User;
    tenantParameters: TenantParameters | null = null;
    countryCode = COUNTRY_CODE;
    phoneValidations = COUNTRY_PHONE_VALIDATIONS;
    selectedCountry: ICountryCode | null = null;
    isOpen = false;
    enableAreaCode = false;

    private areaCodeValidator = (control: AbstractControl): ValidationErrors | null => 
        !control.value ? null : 
        (control.value.startsWith('9') || control.value.startsWith('0')) ? 
        { invalidAreaCodeStart: true } : null;

    private phoneNumberValidator = (control: AbstractControl): ValidationErrors | null => 
        !control.value ? null : 
        (control.value.startsWith('15') || control.value.startsWith('0')) ? 
        { invalidPhoneNumberStart: true } : null;


    contactInfoForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        countryCode: new FormControl('', Validators.required),
        areaCode: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(4),
            Validators.pattern(/^[0-9]+$/),
            this.areaCodeValidator  
        ]),
        phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            this.phoneNumberValidator
        ]),
    });

    constructor() {
        this.setData();
        this.observerContactInfoForm();
    }

    async setData() {

        this.tenantParameters = this.userState.tenantParameters();
        if (!this.tenantParameters) {
            console.error('No se puede datos de tenantparameters');
            return;
        }
        //TODO: COUNTRY
        const country = this.tenantParameters.country ? this.tenantParameters.country : countryENUM.OTHER;
        const defaultCountry = COUNTRY_CODE.find(
            (c) => c.name.toLowerCase() === country.toLowerCase()
        );
        if (defaultCountry) {
            this.selectCountryCode(defaultCountry);
        }
    }

    observerContactInfoForm() {
        this.contactInfoForm.valueChanges.subscribe((value) => {
            this.emitContactInfo(value);
        });
    }

    emitContactInfo(formValue: any) {
        const contactInfo: IContactInfo = {
            email: formValue.email ? formValue.email : this.contactInfoForm.get('email')?.value,
            countryCode: formValue.countryCode,
            areaCode: formValue.areaCode || null,
            phoneNumber: formValue.phoneNumber,
        };

        this.contactInfo.emit({
            data: contactInfo,
            isValid: this.contactInfoForm.valid,
        });
    }

    selectCountryCode(country: ICountryCode) {
        this.selectedCountry = country;
        this.isOpen = false;
        this.contactInfoForm.patchValue({ countryCode: country.phoneCode });
        this.contactInfoForm.get('phoneNumber')?.reset();
        this.enableAreaCode = country.country === countryENUM.ARGENTINA || country.country === countryENUM.ECUADOR;
        this.contactInfoForm.clearValidators();

        const areaCodeValidators = [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(4),
            Validators.pattern(/^[0-9]+$/),
            this.areaCodeValidator
        ];

        const phoneNumberValidators = [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            this.phoneNumberValidator
        ];

        switch (country.country) {
            case countryENUM.ARGENTINA:
                this.enabledAreaCode();
                this.setPhoneNumberValidators(6, 8);
                this.setAreaCodeValidators(2, 4);
                this.contactInfoForm.setValidators(this.sumCharactersValidator);
                break;

            case countryENUM.COLOMBIA:
                this.disabledAreaCode();
                this.setPhoneNumberValidators(7, 11);
                break;

            case countryENUM.PERU:
                this.disabledAreaCode();
                this.setPhoneNumberValidators(9, 9);
                break;

            case countryENUM.ECUADOR:
                this.enabledAreaCode();
                this.setPhoneNumberValidators(7, 9);
                this.setAreaCodeValidators(2, 2);
                break;

            case countryENUM.OTHER:
                this.disabledAreaCode();
                this.setPhoneNumberValidators(8, 15);
                break;

            default:
                break;
        }

        this.contactInfoForm.get('phoneNumber')?.setValidators(phoneNumberValidators);
        this.contactInfoForm.get('phoneNumber')?.updateValueAndValidity();
        
        if (this.enableAreaCode) {
            this.contactInfoForm.get('areaCode')?.setValidators(areaCodeValidators);
            this.contactInfoForm.get('areaCode')?.updateValueAndValidity();
        }

        this.contactInfoForm.updateValueAndValidity();
    }

    enabledAreaCode() {
        this.contactInfoForm.get('areaCode')?.enable();
        this.contactInfoForm.get('areaCode')?.reset();
    }

    disabledAreaCode() {
        this.contactInfoForm.get('areaCode')?.disable();
        this.contactInfoForm.get('areaCode')?.reset();
        this.contactInfoForm.get('areaCode')?.clearValidators();
        this.contactInfoForm.get('areaCode')?.updateValueAndValidity();
    }

    setPhoneNumberValidators(minLength: number, maxLength: number) {
        this.contactInfoForm.get('phoneNumber')?.setValidators([
            Validators.required,
            Validators.minLength(minLength),
            Validators.maxLength(maxLength),
            Validators.pattern(/^[0-9]+$/),
        ]);
        this.contactInfoForm.get('phoneNumber')?.updateValueAndValidity();
    }

    setAreaCodeValidators(minLength: number, maxLength: number) {
        this.contactInfoForm.get('areaCode')?.setValidators([
            Validators.required,
            Validators.minLength(minLength),
            Validators.maxLength(maxLength),
            Validators.pattern(/^[0-9]+$/),
        ]);
        this.contactInfoForm.get('areaCode')?.updateValueAndValidity();
    }

    sumCharactersValidator(control: AbstractControl): ValidationErrors | null {
        const areaCode = control.get('areaCode')?.value || '';
        const phoneNumber = control.get('phoneNumber')?.value || '';
        const totalLength = areaCode.length + phoneNumber.length;
        return totalLength === 10 ? null : { sumCharacters: true };
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const isClickInside = target.closest('.custom-select');
        if (!isClickInside) {
            this.isOpen = false;
        }
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.onDocumentClick);
    }

}
