import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IAddressInfo, IContactInfo } from 'src/app/shared/interface/country-interfaces';
import { GoogleApisService } from 'src/app/services/google-apis.service';
import { StorageService } from 'src/app/services/storage.service';
import { AdressResponse } from './steps/user-address-info/interfaces/address-info.interface';
import { IonContent, ModalController } from '@ionic/angular';
import { ModalMedicalRecordComponent } from 'src/app/shared/componentes/modal-medical-record/modal-medical-record.component';
import { UserService } from '../../../services/user.service';
import { InitialClinicalData, MedicalFormData, MedicalFormDataTwo, OnBoardingRequest, PersonalData, PersonalFormResponse } from './interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsIspsComponent } from 'src/app/shared/componentes/forms-isps/forms-isps.component';
import { UserResponseDTO } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit, OnInit {

  private googleApisService = inject(GoogleApisService);
  storageService = inject (StorageService);
  utilService = inject (UtilsService);
  @ViewChild(IonContent) content!: IonContent;  
  showIsps: boolean = false;
  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer!: ElementRef;
  swiper!: Swiper;
  stepIsValid: boolean = true;
  step: number = 0;
  contactInfo: IContactInfo | null = null;
  addressInfo: any | null = null;
  stepUserContactInfo: boolean = false;
  stepUserAddresstInfo: boolean = false;
  tenantParameters : any;
  country: string = '';
  adressRespons!: AdressResponse;
  user: UserResponseDTO;
  medicalFormData!: MedicalFormData ;
  medicalFormDataTwo!: MedicalFormDataTwo ;
  modalController = inject(ModalController) ;
  userService = inject (UserService)
  completenessData!: InitialClinicalData; 
  adressList: AdressResponse[] = [];
  personalFormResponse: PersonalFormResponse | null = null;
  userInfo: any;
  dataPersonal: any | null = null;

  constructor() { 
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  ngAfterViewInit(): void {

    this.swiper = this.swiperContainer.nativeElement.swiper;
    if (this.swiper) {
      this.swiper.allowTouchMove = false;
    } else {
      console.error('La instancia de Swiper no está disponible.');
    }
  }

  private getDataUser() {
		this.userService.getOnBoarding(this.user.id).subscribe(
			(res: any) => {
				this.setDataUser(res);
				this.setPersonalDataForm(res);
			},
			(error) => {
				console.error(error);
			}
		);
	}

  private setDataUser(dataUser: any) {
		const {
			maritalStatus,
		} = dataUser;
    const dataPersonal: any = {
      estadoCivil: maritalStatus,
    };
    this.dataPersonal = dataPersonal;
	}

  private setPersonalDataForm(dataUser: any) {
		const { email, telephoneNumber } = dataUser;
    const dataPersonalForm: PersonalFormResponse = {
      email: email,
      emailCorporate: email,
      phone: telephoneNumber,
      cellphoneNumber: telephoneNumber
    };
  
    this.personalFormResponse = dataPersonalForm;
	}

  async nextSlide() {
    this.content.scrollToTop(0); 
    if (this.swiperContainer.nativeElement.swiper) {
      if (this.step === 3) {
        const confirmAddress: any = await this.validacionGoogleMaps(this.addressInfo);
        if (confirmAddress) {
          this.swiperContainer.nativeElement.swiper.slideNext();
          this.step++;
        }
      } else {
        this.swiperContainer.nativeElement.swiper.slideNext();
        this.step++;
      }
    }
     if (this.step === 6) {
      this.openModal();
    }
    if (this.step === 7) {
      this.sendCompletenessMedical();
      this.tenantParameters=this.storageService.getSessionStorage('tenantParameters')
      if(this.tenantParameters.tenantParameters.activeModules.find((x: any) => x === 'isps')){ 
        this.goIsps();
      }
    }    
  }
  
  async goIsps() {
    const modal = await this.utilService.modalCtrl.create({
      component: FormsIspsComponent,
      componentProps: {
        onboarding: true
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.onboarding) {
      this.postOnboarding();
      this.utilService.router.navigate(['/tabs/home']);
    }
  }	

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMedicalRecordComponent,
      cssClass: 'custom-modal-class'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.accepted) {
      this.postMedicalInfo(this.medicalFormData,this.medicalFormDataTwo);
    }else{
      localStorage.removeItem('user'); 
      this.storageService.clearLocalStorage(); 
      window.location.href = '/auth';
    }
  }

  prevSlide(): void {
    if (this.swiperContainer.nativeElement.swiper) {
      this.swiperContainer.nativeElement.swiper.slidePrev();
      this.step--;
      if (this.step < 2) {
        this.stepIsValid = true;
      }
    }
  }

  stepsReturnContactInfo(event: any) {
    this.contactInfo = event.data;
    this.stepUserContactInfo = event.isValid;
  }

  stepsReturnAddressInfo(event: any) {
    this.addressInfo = event.data;
    this.stepUserAddresstInfo = event.isValid;
  }

  stepsReturnMedicalInfo(event: any) {
    this.medicalFormData = event;
  }

  stepsReturnMedicalInfoTwo(event: any) {
    this.medicalFormDataTwo = event;
  }

  stepReturnUserInfo(event: any) {
    this.userInfo = event.data;
  }

  validacionGoogleMaps(addressInfo: IAddressInfo) {
    return this.googleApisService.validacionGoogleMaps(addressInfo);
  }

  disabledNextButton(): boolean {
    if (this.step === 2) {
      return !this.stepUserContactInfo;
    }
    if (this.step === 3) {
      return !this.stepUserAddresstInfo
    }
    return false;
  }

  private postMedicalInfo(body: any, bodyTwo: any) {
		const data = {
			medicalHistoryDiseases: {
				isHypertensive: body.arterialHypertension ?? null,
				hasDiabetes: body.diabetesType ? body.diabetesType : body.diabetes === false ? 'NO_DIABETES' : null,
				respiratory: body.respiratory ?? null,
				cardiovascular: body.cardiac ?? null,
				neurologic: body.neurological ?? null,
				metabolic: body.metabolice ?? null,
				psychiatric: bodyTwo.mentalDisorders ?? null,
				onchologic: bodyTwo.oncology ?? null,
				onchologicRespiratory: bodyTwo.onchologicInfo?.onchologicRespiratory ? true : null,
				onchologicGinecological: bodyTwo.onchologicInfo?.onchologicGinecological ? true : null,
				onchologicNephrourological: bodyTwo.onchologicInfo?.onchologicNephrourological ? true : null,
				onchologicGastrointestinal: bodyTwo.onchologicInfo?.onchologicGastrointestinal ? true : null,
				onchologicEndocrinal: bodyTwo.onchologicInfo?.onchologicEndocrinal ? true : null,
				onchologicNeurological: bodyTwo.onchologicInfo?.onchologicNeurological ? true : null,
				gastrointestinal: bodyTwo.gastrointestinal ?? null,
				spine: bodyTwo.spine ?? null,
				endocrinological: bodyTwo.endocrinological ?? null,
				infectious: bodyTwo.infectious ?? null,
				surgeries: bodyTwo.hasSurgeries ?? null,
				surgeriesDescription: bodyTwo.surgeriesDescription ?? null
			}
		};
		this.userService.postMedicalDiseases(this.user.id, data).subscribe(
			() => {
			},
			(error) => {
				console.error(error);
			}
		);
	}

  buildClinicalData(e: any) {
		this.completenessData = e;
	}

  sendCompletenessMedical() {
		this.userService.postCompletenessMedicalInformation(this.user.id, this.completenessData).subscribe(() => {
		});
	}

  private buildPostResquest(): OnBoardingRequest {
		this.adressList = [];
		this.adressList.push(this.addressInfo);

    const onBoardingRequest: any = {
      bornDate: this.userInfo,
      email: this.contactInfo!.email,
      emailCorporate: this.contactInfo!.email,
      telephoneNumber: this.personalFormResponse?.phone,
      cellphoneNumber: this.personalFormResponse?.phone,
      maritalStatus: this.dataPersonal.estadoCivil,
      address: this.adressList,
      onboarded: true
    };
    return onBoardingRequest;
	}

  public postOnboarding(){
    this.userService.postOnBoarding(this.user.id, this.buildPostResquest()).subscribe(() => {
		});
  }

}
