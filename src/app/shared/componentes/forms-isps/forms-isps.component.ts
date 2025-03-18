import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { ISPSService } from 'src/app/services/isps.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormIspsStepOneComponent } from './form-isps-step-one/form-isps-step-one.component';
import { FormIspsStepTwoComponent } from './form-isps-step-two/form-isps-step-two.component';
import { FormIspsStepThreeComponent } from './form-isps-step-three/form-isps-step-three.component';

@Component({
  selector: 'app-forms-isps',
  templateUrl: './forms-isps.component.html',
  styleUrls: ['./forms-isps.component.scss'],
  animations: [
    trigger('slideOut', [
      transition(':leave', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeIn', [
      state('isBeginning', style({
        transform: 'translateX(-10px)'
      }))
    ])
  ]
})
export class FormsIspsComponent implements AfterViewInit, OnInit {

  stepOne: any;
  stepTwo: any;
  stepThree: any;
  stepFour: any;
  validStep : boolean = false;
  swiper: any;
  nextBtnDescription: string = 'Siguiente';
  step: number = 1;
  progress: number = 0.25;
  totalSteps: number = 5;
  dataIsps: any;
  user!: User;
  translatesISPS: any;
  toastMessage: string = '';
  isToastOpen: boolean = false;
  invalidLastStep: boolean = true;
  questionGestor: string | null = null;
  completeIsps: boolean = false;
  messageThroughCellphone: any;
  viewChoiceMessageThroughCellphone: boolean = true;
  
  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer!: ElementRef;
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild(FormIspsStepOneComponent) step1!: FormIspsStepOneComponent;
  @ViewChild(FormIspsStepTwoComponent) step2!: FormIspsStepTwoComponent;
  @ViewChild(FormIspsStepThreeComponent) step3!: FormIspsStepThreeComponent;

  ispsService = inject (ISPSService);
  storageService = inject(StorageService);
  utilsService = inject(UtilsService)

  @Input() onboarding!: boolean;

  constructor() { }

  async ngOnInit() {
    this.user = this.storageService.getSessionStorage<User>('user')!;
    this.translatesISPS = this.utilsService.getLocalization('isps');
    if (localStorage.getItem('gestorWillContactYou') && localStorage.getItem('gestorWillContactYou') === 'true' || localStorage.getItem('gestorWillContactYou') === 'false') {
      this.questionGestor = localStorage.getItem('gestorWillContactYou');
      this.messageThroughCellphone = localStorage.getItem('gestorWillContactYou');
      this.viewChoiceMessageThroughCellphone = false;
      this.invalidLastStep = false;
    }

    this.onboarding ? (this.validStep = true) : this.step++;

  } 

  ngAfterViewInit(): void {
    this.swiper = this.swiperContainer.nativeElement.swiper;
    this.swiper.allowTouchMove = false;
  }

  closeModal(){
    if(this.onboarding){
      this.utilsService.modalCtrl.dismiss({
        onboarding: true,
      })
    }else{
      this.utilsService.modalCtrl.dismiss()
    }
    
  }

  returnFirstStep(event: Event) {
    this.stepOne = event;
  }

  returnSecondStep(event: Event) {
    this.stepTwo = event;
  }

  returnThirdStep(event: Event) {
    this.stepThree = event;
  }

  nextSlide() {
    this.validStep=false;    
    
    if (this.step === 4 ) {
      this.saveAnswers();
      this.swiper.slideNext();
        this.step++;
        this.updateProgress();
        this.scrollToTop();
        if(this.onboarding){
          this.closeModal();
        }
    } else {
      if (this.swiper) {      
        this.swiper.slideNext();
        this.step++;
        this.updateProgress();
        this.scrollToTop();
      } else {
        console.error('Swiper no se ha inicializado correctamente.');
      }
    }
  }

  updateProgress() {
    this.progress = (this.step + 1) / (this.totalSteps + 1);
  }

  scrollToTop() {
    this.content.scrollToTop(0); 
  }

  updateValidStep(isValid: boolean) {
    this.validStep = isValid;
  }

  goBack() {
    this.swiper.slidePrev();
    this.step--;
    this.updateProgress();
    this.scrollToTop();
  }

  returnDescriptionBtn() {
    switch (this.step) {
      case 4:
        this.nextBtnDescription = 'Enviar'
        break;
      case 5:
        this.nextBtnDescription = 'Finalizar'
        break;
      default:
        this.nextBtnDescription = 'Siguiente'
        break;
    }
    return this.nextBtnDescription
  }

  finish(data: any) {
    this.ispsService.patchIPSContent(this.user.id, data).subscribe(() => {
      this.toastMessage=this.translatesISPS.thanks
      this.isToastOpen=true;
      this.utilsService.modalCtrl.dismiss({ updated: true });
    });
    (err: Error) => {
      console.error(err, 'Error al finalizar el indice de salud psicosocial');
    };
  }

  saveAndFinish() {
    if (this.questionGestor === 'true' || this.questionGestor === 'false') {
      const stepValue = this.questionGestor === 'true' ? true : false;
      const data = {
        messageThroughCellphone: stepValue 
      }
      this.finish(data)
    } else {
      const data = {
        messageThroughCellphone: false
      }
      this.finish(data)
    }
  }

  returnQuestionValue(value: string){
    console.log(value, 'value')
    this.invalidLastStep = false;
    this.questionGestor = value
    this.stepFour = this.questionGestor === 'true' ? true : false;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  saveAnswers() {
    this.step1.emitForm()
    this.step2.emitForm()
    this.step3.emitForm()
    const data = {
      //Data step 1
      moodSwings: this.stepOne.irritable,
      impulsive: this.stepOne.impulsive,
      frequentlyArgue: this.stepOne.argued,
      anxiousMannerisms: this.stepOne.episodes,
      unableToRelax: this.stepOne.unableRelax,
      worryFutureMisfortunes: this.stepOne.worried,
      personalProblemsHandling: this.stepOne.confidence,
      futureSelfProjecting: this.stepOne.threeYears,
      enjoyDailyActivities: this.stepOne.enjoy,
   
      //Data step 2
      energyForDailyTasks: this.stepTwo.energy,
      properlyFocus: this.stepTwo.concentrate,
      cantFaceAllToDo: this.stepTwo.confront,
      comfortabilityOppositeSexSmalltalk: this.stepTwo.comfortable,
      comfortabilityUnknownGroup: this.stepTwo.comfortableGroup,
      feelMostTimeAfraid: this.stepTwo.scared,
      feelUnionCloseCircle: this.stepTwo.contained,
      feelLeftBehind: this.stepTwo.excluded,
      feelAloneInGroup: this.stepTwo.alone,

      //Data step 3
      properDiet: this.stepThree.healthyFood,
      fastfoodConsuming: this.stepThree.junkFood,
      sugarbasedDrinks: this.stepThree.sugar,
      enoughSleep: this.stepThree.sleepEnough,
      hardtimeSleeping: this.stepThree.sleepDifficult,
      repairingSleep: this.stepThree.restfulSleep,
      sedentaryJob: this.stepThree.sitting,
      dailyPhysicalActivity: this.stepThree.exercise,
      sports: this.stepThree.sport,
      
      messageThroughCellphone: null,
      shortly: false
    };
    this.sendDataAnswers(data);
  }


  sendDataAnswers(data: any) {
    this.ispsService.postIPSContent(this.user.id, data).subscribe((data) => {
      this.dataIsps = data;
      this.toastMessage='Respuestas isps actualizados exitosamente.';
      this.isToastOpen=true;
    });
    (err: Error) => {
      console.error(err, 'Error al cargar respuestas isps');
    };
  }

}
