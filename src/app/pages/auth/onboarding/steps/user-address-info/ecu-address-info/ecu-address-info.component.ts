import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantParameters } from 'src/app/core/interfaces/tenantParameters';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-ecu-address-info',
    templateUrl: './ecu-address-info.component.html',
    styleUrls: ['./ecu-address-info.component.scss'],
    standalone: false
})
export class ECUAddressInfoComponent implements OnInit {

    nonWhitespaceRegExp: RegExp = new RegExp('\\S');
    provincias: any[] = [];
    public localidades: any[] = [];

    storageService = inject(StorageService);
    userService = inject(UserService);
    userState = inject(UserStateService);
    tenantParameters = computed(() => this.userState.tenantParameters());

    addressForm = new FormGroup({
        Calle: new FormControl('', { validators: [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)] }),
        Numero: new FormControl('', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]\d*$/)] }),
        Piso: new FormControl('', { validators: [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)] }),
        Depto: new FormControl('', { validators: [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)] }),
        Provincia: new FormControl('', { validators: [Validators.required] }),
        codigoPostal: new FormControl('', [Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(6), Validators.minLength(5)]),
        Localidad: new FormControl('', { validators: [Validators.required] }),
        observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
        countryCode: new FormControl(''),
    });

    constructor() { }

    ngOnInit() {
        this.getProvincias();
        this.provinciasChanges();
    }

    private getProvincias() {
        // this.adressForm.controls.Provincia.disable();
        this.userService.getAddressesState().subscribe((res: any) => {
            res.forEach((e: any) => {
                e.name = e.name.toUpperCase();
            });
            this.provincias = res;
            if (this.provincias.length > 0) {
                this.addressForm.controls.Provincia.enable();
                this.addressForm.controls.Localidad.disable();
            }
        });
    }

    private provinciasChanges() {
        this.addressForm.get('Provincia')?.valueChanges.subscribe(() => {
            this.localidades = [];
            const value = this.addressForm.get('Provincia')?.value as any;
            const id = value?.id + '';
            this.addressForm.controls.Localidad.reset();
            if (value?.id) {
                this.userService.getLocalitiesByState(id).subscribe((res: any) => {
                    res.forEach((e: any) => {
                        e.name = e.name.toUpperCase();
                        this.localidades.push(e);
                    });
                    if (this.localidades.length > 0) {
                        this.addressForm.controls.Localidad.enable();
                    }
                });
            }
        });
    }


}
