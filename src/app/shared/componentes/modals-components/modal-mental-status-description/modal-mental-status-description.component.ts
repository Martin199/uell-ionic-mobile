import { Component, inject, Input, OnInit } from '@angular/core';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { IMoodDayList } from 'src/app/shared/interface/mental-status.interfaces';

@Component({
  selector: 'app-modal-mental-status-description',
  templateUrl: './modal-mental-status-description.component.html',
  styleUrls: ['./modal-mental-status-description.component.scss'],
})
export class ModalMentalStatusDescriptionComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);

  @Input() mentalStatusData!: IMoodDayList;
  descriptionCurrent: string = 'Muy mal';
  currentImage: string = 'assets/imgs/mental-status/mental-status-4.svg';
  gradientStyle: string = this.getGradient(1);

  constructor() {}

  ngOnInit() {
    if (this.mentalStatusData.userMoodRecordId) {
      this.getMentalSatudByUserMoodRecordId(
        this.mentalStatusData.userMoodRecordId
      );
    }
    if (this.mentalStatusData) {
      this.setImage(this.mentalStatusData);
    }
  }

  getMentalSatudByUserMoodRecordId(userMoodRecordId: number) {
    this.mentalStatusService
      .getMentalSatudByUserMoodRecordId(userMoodRecordId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
  }

  setImage(mentalStatus: IMoodDayList) {
    this.gradientStyle = this.getGradient(mentalStatus.moodId!);
    this.currentImage =
    mentalStatus.moodId === 1
    ? 'assets/imgs/mental-status/mental-status-1.svg'
    : mentalStatus.moodId === 2
    ? 'assets/imgs/mental-status/mental-status-2.svg'
    : mentalStatus.moodId === 3
    ? 'assets/imgs/mental-status/mental-status-3.svg'
    : mentalStatus.moodId === 4
    ? 'assets/imgs/mental-status/mental-status-4.svg'
    : mentalStatus.moodId === 5
    ? 'assets/imgs/mental-status/mental-status-5.svg'
    : mentalStatus.moodId === 6
    ? 'assets/imgs/mental-status/mental-status-6.svg'
    : mentalStatus.moodId === 7
    ? 'assets/imgs/mental-status/mental-status-7.svg'
    : '';
    this.descriptionCurrent = mentalStatus.description
      ? mentalStatus.description
      : '';
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
}
