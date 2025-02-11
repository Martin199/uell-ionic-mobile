import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-arg-address-info',
  templateUrl: './arg-address-info.component.html',
  styleUrls: ['./arg-address-info.component.scss'],
})
export class ARGAddressInfoComponent  implements OnInit {


  tenantParameters : any;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  provincias: any[] = [];
  public localidades: any[] = [];

  storageService = inject(StorageService);
  userService = inject(UserService);

  addressForm = new FormGroup({
    Calle: new FormControl('', { validators: [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)] }),
    Numero: new FormControl('', { validators: [Validators.required, Validators.maxLength(5)],  }),
    Piso: new FormControl('', { validators: [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)] }),
    Depto: new FormControl('', { validators: [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)] }),
    Provincia: new FormControl('', { validators: [Validators.required] }),
    codigoPostal: new FormControl('', [Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(5), Validators.minLength(3)]),
    Localidad: new FormControl('', { validators: [ Validators.required] }),
    observation: new FormControl('', { validators: [Validators.maxLength(250)] }),
    countryCode: new FormControl(''),

  });

  constructor() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');

    // this.adressForm = this.fb.group({
		// 	Calle: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]],
		// 	Numero: ['', [this.dinamicRequired(this.isOtherCountry), Validators.pattern(this.dinamicPattern())]],
		// 	Piso: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)]],
		// 	Depto: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(3)]],
		// 	Provincia: ['', [Validators.required]],
		// 	codigoPostal: ['', this.country === countryENUM.ECUADOR ? [Validators.pattern(/^[0-9]\d*$/)] :
		// 						[this.dinamicRequired(this.isOtherCountry), Validators.pattern(/^[0-9]\d*$/)]],
		// 	Localidad: ['', [ Validators.required]],
		// 	observation: ['', Validators.maxLength(250)],
		// 	countryCode: ['']
		// });
   }

  ngOnInit() {
    this.getProvincias();
    this.provinciasChanges();
    console.log('user address info arg')
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
