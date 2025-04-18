import { Component, inject, signal } from '@angular/core';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import {
  IContextStatus,
  IEmotionStatus,
  IMentalStatusResponse,
  IMentalStatusPayload,
  IMoodsStatus,
} from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-modal-mental-status',
  templateUrl: './modal-mental-status.component.html',
  styleUrls: ['./modal-mental-status.component.scss'],
})
export class ModalMentalStatusComponent {
  private mentalStatusService = inject(MentalStatusService);
  private userService = inject(UserService);
  utilsService = inject(UtilsService);

  private _userInfo = this.userService.getUser();
  currentStep = signal<number>(1);
  titleStep = signal<string>(
    `¿Cómo te sientes hoy ${this._userInfo.name ? this._userInfo.name.split(' ')[0] : ''}?`
  );
  subtitleStep = signal<string>(`Paso ${this.currentStep()} de 3`);
  imgPatch = signal<string>('');
  imgDescription = signal<string>('');
  gradientStyle: string = this.getGradient(1);
  moodsInfo: IMoodsStatus[] = [];
  emotionInfo: IEmotionStatus[] = [];
  contextInfo: IContextStatus[] = [];
  moodsData!: IMoodsStatus;
  emotionData: IEmotionStatus[] = [];
  contextData: IContextStatus[] = [];
  mentalStatusPayload!: IMentalStatusPayload;

  emotionIdFilterList: { bad: number[]; neutral: number[]; good: number[] } = {
    bad: [17, 5, 26, 1, 38, 13, 22, 27, 8, 20, 32, 11, 35, 15, 25, 34, 14, 12, 39, 2, 36],
    neutral: [2, 7, 9, 24, 30],
    good: [6, 18, 35, 29, 21, 3, 37, 28, 10, 19, 16, 33, 4, 23, 9, 7, 30],
  };
  emotionIdFilter = signal<number[]>([]);

  constructor() {
    this.getMentalStatus();
  }

  getMentalStatus() {
    this.mentalStatusService.getMentalStatus().subscribe({
      next: (res: IMentalStatusResponse) => {
        this.moodsInfo = res.moods;
        this.emotionInfo = res.emotion;
        this.contextInfo = res.context;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  onRangeChange(value: any) {
    if (this.currentStep() != 1) {
      this.gradientStyle = '#fff';
    } else {
      this.gradientStyle = this.getGradient(value.id);
      this.getEmotionIdFilter(value.id);
      this.getMoodImg(value.id);
      this.imgDescription.set(value.description);
      this.moodsData = value;
      this.emotionData = [];
      this.contextData = [];
    }
  }

  getMoodImg(id: number) {
    this.imgPatch.set(
      id === 1
        ? 'assets/imgs/mental-status/mental-status-1.svg'
        : id === 2
        ? 'assets/imgs/mental-status/mental-status-2.svg'
        : id === 3
        ? 'assets/imgs/mental-status/mental-status-3.svg'
        : id === 4
        ? 'assets/imgs/mental-status/mental-status-4.svg'
        : id === 5
        ? 'assets/imgs/mental-status/mental-status-5.svg'
        : id === 6
        ? 'assets/imgs/mental-status/mental-status-6.svg'
        : id === 7
        ? 'assets/imgs/mental-status/mental-status-7.svg'
        : 'assets/imgs/mental-status/mental-status-4.svg'
    );
  }

  getGradient(value: number): string {
    switch (value) {
      case 1:
        return 'linear-gradient(0deg, rgba(238, 49, 107, 0.6) 0%, rgba(238, 49, 107, 0) 100%)';
      case 2:
        return 'linear-gradient(0deg, rgba(242, 109, 0, 0.6) 0%, rgba(242, 109, 0, 0) 100%)';
      case 3:
        return 'linear-gradient(0deg, rgba(249, 177, 12, 0.6) 0%, rgba(249, 177, 12, 0) 100%)';
      case 4:
        return 'linear-gradient(0deg, rgba(138, 149, 171, 0.6) 0%, rgba(138, 149, 171, 0) 100%)';
      case 5:
        return 'linear-gradient(0deg, rgba(21, 189, 109, 0.6) 0%, rgba(21, 189, 109, 0) 100%)';
      case 6:
        return 'linear-gradient(0deg, rgba(29, 164, 177, 0.6) 0%, rgba(29, 164, 177, 0) 100%)';
      case 7:
        return 'linear-gradient(0deg, rgba(68, 216, 232, 0.6) 0%, rgba(68, 216, 232, 0) 100%)';
      default:
        return 'linear-gradient(0deg, rgba(138, 149, 171, 0.6) 0%, rgba(138, 149, 171, 0) 100%)';
    }
  }

  getTitle() {
    if (this.currentStep() === 1) {
      return `¿Cómo te sientes hoy ${this._userInfo.name ? this._userInfo.name.split(' ')[0] : ''}?`
    } else if (this.currentStep() === 2) {
      this.gradientStyle = '#fff';
      return '¿Qué emociones sientes en este momento?';
    } else if (this.currentStep() === 3) {
      this.gradientStyle = '#fff';
      return '¿Qué factores han influido en cómo te sientes hoy?';
    } else {
      return '';
    }
  }

  getEmotionIdFilter(id: number) {
    this.emotionIdFilter.set(
      id === 1 || id === 2 || id === 3
        ? this.emotionIdFilterList.bad
        : id === 4
        ? this.emotionIdFilterList.neutral
        : id === 5 || id === 6 || id === 7
        ? this.emotionIdFilterList.good
        : this.emotionIdFilterList.neutral
    );
  }

  selectedEmotionsChange(emotions: IEmotionStatus[]) {
    this.emotionData = emotions;
  }

  selectedContextChange(context: IContextStatus[]) {
    this.contextData = context;
  }

  buldMentalStatusPayload() {
    const emotionIdList = this.emotionData.map((emotion) => emotion.id);
    const contextIdList = this.contextData.map((context) => context.id);
    this.mentalStatusPayload = {
      moodId: this.moodsData.id,
      emotionIdList: emotionIdList,
      contextIdList: contextIdList,
    };
    this.emotionData = [];
    this.contextData = [];
  }

  postMentalStatus() {
    this.mentalStatusService
      .postMentalStatus(this._userInfo.id, this.mentalStatusPayload)
      .subscribe({
        next: () => {
          this.closeModal(true);
        },
        error: (err) => {
          console.error(err);
          this.closeModal(false);
        },
        complete: () => {
          this.refreshCalendarToCurrentMonth();
        },
      });
  }

  nextStep() {
    if (this.currentStep() === 3) {
      this.buldMentalStatusPayload();
      this.postMentalStatus();
    } else {
      this.currentStep.set(this.currentStep() + 1);
      this.subtitleStep.set(`Paso ${this.currentStep()} de 3`);
      this.titleStep.set(this.getTitle());
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
      this.subtitleStep.set(`Paso ${this.currentStep()} de 3`);
      this.titleStep.set(this.getTitle());
    }
  }

  closeModal(postMentalStatus: boolean) {
    this.utilsService.modalCtrl.dismiss({
      postMentalStatus: postMentalStatus,
      creditPoints:
        this.emotionData.length > 0 && this.contextData.length > 0
          ? 3
          : this.emotionData.length > 0 || this.contextData.length > 0
          ? 2
          : 1,
    });
  }

  refreshCalendarToCurrentMonth() {
    this.mentalStatusService.triggerRefreshToCurrentMonth();
  }
}
