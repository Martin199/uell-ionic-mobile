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
import { ImageClass } from 'src/app/services/interfaces/camera.interfaces';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit, OnInit {
  private googleApisService = inject(GoogleApisService);
  storageService = inject(StorageService);
  utilService = inject(UtilsService);
  @ViewChild(IonContent) content!: IonContent;
  showIsps: boolean = false;
  @ViewChild('swiperContainer', { read: ElementRef })
  swiperContainer!: ElementRef;
  swiper!: Swiper;
  stepIsValid: boolean = true;
  step: number = 0;
  contactInfo: IContactInfo | null = null;
  addressInfo: any | null = null;
  stepUserContactInfo: boolean = false;
  stepUserAddresstInfo: boolean = false;
  tenantParameters: any;
  country: string = '';
  profilePicture: ImageClass | null = null;
  adressRespons!: AdressResponse;
  user: UserResponseDTO;
  medicalFormData!: MedicalFormData;
  medicalFormDataTwo!: MedicalFormDataTwo;
  modalController = inject(ModalController);
  userService = inject(UserService);
  completenessData!: InitialClinicalData;
  adressList: AdressResponse[] = [];
  personalFormResponse: PersonalFormResponse | null = null;
  userInfo: any;
  dataPersonal: any | null = null;
  adressUser: any;
  progress: number = 0.125;
  totalSteps: number = 8;
  skipClinicalHistory: boolean = false;

  constructor() {
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
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
        this.adressUser = res.address[0];
        this.setDataUser(res);
        this.setPersonalDataForm(res);
        this.validCLinicalHistory();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private setDataUser(dataUser: any) {
    const { maritalStatus } = dataUser;
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
      cellphoneNumber: telephoneNumber,
    };

    this.personalFormResponse = dataPersonalForm;
  }

  validCLinicalHistory() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    if (!this.tenantParameters.tenantParameters.activeModules.find((x: any) => x === 'hc_onboarding')) {
      this.skipClinicalHistory = true;
    }
  }

  async nextSlide() {
    this.progress = this.progress + 0.125;
    this.content.scrollToTop(0);
    if (this.swiperContainer.nativeElement.swiper) {
      if (this.step === 3) {
        const confirmAddress: any = await this.validacionGoogleMaps(
          this.addressInfo
        );
        if (confirmAddress) {
          this.swiperContainer.nativeElement.swiper.slideNext();
          this.step++;
        }
      } else {
        this.swiperContainer.nativeElement.swiper.slideNext();
        this.step++;
      }
    }
    if (this.step === 4 && this.skipClinicalHistory) {
      this.step = 7;
    }
    if (this.step === 6) {
      this.openModal();
    }
    if (this.step === 8) {
      this.sendCompletenessMedical();
      this.tenantParameters =
        this.storageService.getSessionStorage('tenantParameters');
      if (
        this.tenantParameters.tenantParameters.activeModules.find(
          (x: any) => x === 'isps'
        ) &&
        this.tenantParameters.tenantParameters.excludeISPSFromOnboarding !==
          'true'
      ) {
        this.goIsps();
      } else {
        await this.postOnboarding();
        this.utilService.navCtrl.navigateRoot(['/tabs/home']);
      }
    }
  }

  async goIsps() {
    const modal = await this.utilService.modalCtrl.create({
      component: FormsIspsComponent,
      componentProps: {
        onboarding: true,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.onboarding && !data?.resetToStepOne) {
      const loading = await this.utilService.loading();
      await loading.present();
      await this.postOnboarding();
      this.utilService.navCtrl.navigateRoot(['/tabs/home']);
    } else if (data?.resetToStepOne) {
      this.step = 0;
      this.progress = 0.125;
      this.swiperContainer.nativeElement.swiper.slideTo(0);
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMedicalRecordComponent,
      cssClass: 'custom-modal-class',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.accepted) {
      this.postMedicalInfo(this.medicalFormData, this.medicalFormDataTwo);
    } else {
      localStorage.removeItem('user');
      this.storageService.clearLocalStorage();
      window.location.href = '/auth';
    }
  }

  prevSlide(): void {
    this.step == 0 ? (this.step = 0) : this.step--;
    this.progress !== 0.125
      ? (this.progress = this.progress - 0.125)
      : (this.progress = 0.125);
    if (this.swiperContainer.nativeElement.swiper) {
      this.swiperContainer.nativeElement.swiper.slidePrev();
    }
    if (this.step === 2) {
      this.stepIsValid = this.stepUserContactInfo;
    } else if (this.step === 3) {
      this.stepIsValid = this.stepUserAddresstInfo;
    } else {
      this.stepIsValid = true;
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

  profilePictureEvent(event: ImageClass | null) {
    this.profilePicture = event;
  }

  validacionGoogleMaps(addressInfo: IAddressInfo) {
    return this.googleApisService.validacionGoogleMaps(addressInfo);
  }

  disabledNextButton(): boolean {
    if (this.step === 2) {
      return !this.stepUserContactInfo;
    }
    if (this.step === 3) {
      return !this.stepUserAddresstInfo;
    }
    return false;
  }

  private postMedicalInfo(body: any, bodyTwo: any) {
    const data = {
      medicalHistoryDiseases: {
        isHypertensive: body.arterialHypertension ?? null,
        hasDiabetes: body.diabetesType
          ? body.diabetesType
          : body.diabetes === false
          ? 'NO_DIABETES'
          : null,
        respiratory: body.respiratory ?? null,
        cardiovascular: body.cardiac ?? null,
        neurologic: body.neurological ?? null,
        metabolic: body.metabolice ?? null,
        psychiatric: bodyTwo.mentalDisorders ?? null,
        onchologic: bodyTwo.oncology ?? null,
        onchologicRespiratory: bodyTwo.onchologicInfo?.onchologicRespiratory
          ? true
          : null,
        onchologicGinecological: bodyTwo.onchologicInfo?.onchologicGinecological
          ? true
          : null,
        onchologicNephrourological: bodyTwo.onchologicInfo
          ?.onchologicNephrourological
          ? true
          : null,
        onchologicGastrointestinal: bodyTwo.onchologicInfo
          ?.onchologicGastrointestinal
          ? true
          : null,
        onchologicEndocrinal: bodyTwo.onchologicInfo?.onchologicEndocrinal
          ? true
          : null,
        onchologicNeurological: bodyTwo.onchologicInfo?.onchologicNeurological
          ? true
          : null,
        gastrointestinal: bodyTwo.gastrointestinal ?? null,
        spine: bodyTwo.spine ?? null,
        endocrinological: bodyTwo.endocrinological ?? null,
        infectious: bodyTwo.infectious ?? null,
        surgeries: bodyTwo.hasSurgeries ?? null,
        surgeriesDescription: bodyTwo.surgeriesDescription ?? null,
      },
    };
    this.userService.postMedicalDiseases(this.user.id, data).subscribe(
      () => {},
      (error) => {
        console.error(error);
      }
    );
  }

  buildClinicalData(e: any) {
    this.completenessData = e;
  }

  sendCompletenessMedical() {
    this.userService
      .postCompletenessMedicalInformation(this.user.id, this.completenessData)
      .subscribe(() => {});
  }

  private async buildPostRequest(): Promise<OnBoardingRequest> {
    this.adressList = [];
    this.googleApisService.pushIdAddress(this.adressUser.id);
    this.adressList.push(this.googleApisService.getAddressPayload()!);

    const contactInfo: any = {
      countryCode: this.contactInfo?.countryCode,
      areaCode: this.contactInfo?.areaCode,
      phoneNumber: this.contactInfo?.phoneNumber,
      id: this.personalFormResponse?.cellphoneNumber?.id,
    };

    let photo = null;
    if (this.profilePicture) {
      try {
        const photoResponse = await firstValueFrom(
          this.userService.postB64Picture({
            fileName: `profile_${this.user.id}.${this.profilePicture.format}`,
            fileContent: `data:image/${this.profilePicture.format};base64,${this.profilePicture.base64String}`,
          })
        );
        photo = photoResponse;
        const stringWithoutQuotes = JSON.stringify(photo).replace(/^"(.*)"$/, '$1');
        localStorage.setItem('current_photo', stringWithoutQuotes);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }

    const onBoardingRequest: any = {
      bornDate: this.userInfo,
      email: this.contactInfo!.email,
      emailCorporate: this.contactInfo!.email,
      telephoneNumber: contactInfo,
      cellphoneNumber: contactInfo,
      maritalStatus: this.dataPersonal.estadoCivil,
      address: this.adressList,
      onboarded: true,
      photo: photo,
    };
    return onBoardingRequest;
  }

  public async postOnboarding() {
    const request = await this.buildPostRequest();
    this.userService.postOnBoarding(this.user.id, request).subscribe(() => {});
  }
}
