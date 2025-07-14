import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { catchError, EMPTY, tap } from 'rxjs';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { AnthropometryService } from 'src/app/services/anthropometry.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from 'src/app/services/user.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import {
  IonIcon,
  IonLabel,
  IonInput,
  IonFooter,
  IonToolbar,
  IonButton,
  IonPopover,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-anthropometry',
  templateUrl: './anthropometry.component.html',
  styleUrls: ['./anthropometry.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonInput,
    IonFooter,
    IonToolbar,
    IonButton,
    IonPopover,
    IonContent,
    FormsModule,
    ReactiveFormsModule
],
})
export class AnthropometryComponent  implements OnInit, OnChanges {

  anthropometryForm! : FormGroup;
  pageTitle: string = 'Antropometría';
  sectionText: string = `Ten en cuenta que este resultado es estimativo, 
  ya que no considera la contextura física o la masa muscular de la persona. 
  Para obtener un diagnóstico más preciso, consulta con un nutricionista o un profesional de la salud.`;
  maxInputLength: number = 3;
  minValue: number = 1;
  maxHeight: number = 250;
  maxWeight: number = 300;
  onlyIntegers: RegExp = /^\d+$/;
  onlyDecimals: RegExp = /^(\d{2}\.\d{2}|\d{2}\.\d{1}|\d{3}\.\d|\d{2}|\d{3})$/;
  thirtyDaysMessage: string = 'Debes esperar a que pasen 30 días desde tu última actualización de Antropometría.';
  modalVisible: boolean = false;
  modalTitle1: string = '';
  modalTitle2: string = '';
  modalText1: string = '';
  modalText2: string = '';
  _user: number | null = null;

  @Input() isPost: boolean = false;
  @Output() formResults = new EventEmitter<any>();

  formBuilder = inject(FormBuilder);
  apiUsersService = inject(CognitoService);
  modalController = inject(ModalController);
  anthropometryService = inject(AnthropometryService);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  private userState = inject(UserStateService);

  constructor() { }

  ngOnInit() {
    this._user = this.userState.userId();
    if (!this._user) {
        console.error('No se puede obtener el id del usuario');
        return;
    }
    this.anthropometryForm = this.formBuilder.group({
      height: ['', [Validators.required, Validators.pattern(this.onlyIntegers), Validators.maxLength(this.maxInputLength), Validators.min(this.minValue), Validators.max(this.maxHeight)]],
      weight: ['', [Validators.required, Validators.pattern(this.onlyDecimals), Validators.maxLength(5), Validators.min(this.minValue), Validators.max(this.maxWeight)]],
      waist: ['', [Validators.required, Validators.pattern(this.onlyIntegers), Validators.maxLength(this.maxInputLength)]],
    });

    this.checkFormValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isPost'] && 
        changes['isPost'].currentValue === true) {
      this.postAnthropometry();
    }
  }

  checkFormValidity() {
    this.anthropometryForm?.valueChanges.subscribe(() => {
      this.formResults.emit(this.anthropometryForm?.valid);
    });
  }

  heightControlInput(event: KeyboardEvent) {
    if (event.key.length === 1 && !event.key.match(/[0-9]/)) {
      event.preventDefault();
    }
  }

  weightControlInput(event: KeyboardEvent) {
    let pattern = /[0-9.]/;
    let specialKeys: Array<string> = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  
    if (!pattern.test(event.key) && specialKeys.indexOf(event.key) === -1) {
      event.preventDefault();
    }
  }

  waistControlInput(event: KeyboardEvent) {
    if (event.key.length === 1 && !event.key.match(/[0-9]/)) {
      event.preventDefault();
    }
  }

  openModal(setting: string) {
    if (setting === 'waist') {
      this.modalTitle1 = `Cómo obtener una circunferencia de cintura más precisa`;
      this.modalText1 = `Utiliza una cinta métrica y asegúrate de cumplir con los siguientes requisitos:
      realiza la medición a la altura del ombligo, por la mañana, en ayunas, después de ir al baño. 
      En caso de dificultad, pide ayuda a otra persona.`;
      this.modalText2 = '';
    } else if (setting === 'weight') {
      this.modalTitle1 = `Cómo obtener un pesaje preciso`;
      this.modalText1 = `Utiliza una balanza y asegúrate de cumplir con los 
      siguientes requisitos: realiza el pesaje por la mañana, 
      en ayunas después de ir al baño, sin calzado 
      y con la menor cantidad de ropa posible.`
      this.modalText2 = `Es importante que para tu próximo pesaje respetes 
      la misma cantidad de ropa que en tu pesaje anterior.`
    }
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  closeModalWithData() {
    this.modalVisible = false;
    this.modalController.dismiss();
  }

  calculateBMI(weightKg: number, heightCm: number): number {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 100) / 100;
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  hasThirtyDaysPassed(dateString: string): boolean {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - date.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays >= 30;
  }

  setAnthropometryStatus(content: any) {
    if (content && 
        content.weight && 
        content.height && 
        content.abdominalCircumference &&
        !this.hasThirtyDaysPassed(content.created)) {
      this.anthropometryService.setAnthropometryStatus = true;
    } else {
      this.anthropometryService.setAnthropometryStatus = false;
    }
  }

  setAnthropometryData(content: any) {
    if (content) {
      this.anthropometryService.setAnthropometryData = content;
    }
  }

  postAnthropometry() {
    const formWeight = this.anthropometryForm?.controls['weight'].value;
    const formHeight = this.anthropometryForm?.controls['height'].value;
    const formWaist = this.anthropometryForm?.controls['waist'].value;
    const body = {
      weight: parseFloat(formWeight),
      height: parseInt(formHeight),
      abdominalCircumference: formWaist,
      userId: this._user,
      bodyMassIndex: this.calculateBMI(formWeight, formHeight),
      measurementDate: this.getTodayDate()
    }
    this.anthropometryService.postAnthropometry(body).pipe(
      tap((resp: any) => {
        const content = resp;
        if (resp.error && resp.error.message === "Body measurement already exists for this user within the last 30 days") {
          this.modalController.dismiss(resp);
          this.utilsService.getToastMessage('bottom', 3000, 'Podés actualizar los datos nuevamente luego de 30 días.')
        } else {
          const message = content ? 'Se guardaron correctamente los cambios de Antropometría.' : 'No se pudieron guardar los cambios de Antropometría.';
          this.utilsService.getToastMessage('bottom', 3000, message);
          this.userService.setCurrentProgress(content.completenessPercentage);
          
          if (content) {
            this.setAnthropometryStatus(content);
            this.setAnthropometryData(content);
            this.modalController.dismiss(resp.content);
          }
          this.closeModalWithData()
        }
      }),
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    ).subscribe();
  }
}
