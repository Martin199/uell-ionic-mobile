import { Component, input, OnInit, output } from '@angular/core';
import { IEmotionStatus } from '../../interface/mental-status.interfaces';

@Component({
  selector: 'app-emotion-status',
  templateUrl: './emotion-status.component.html',
  styleUrls: ['./emotion-status.component.scss'],
})
export class EmotionStatusComponent implements OnInit {
  emotionInfo = input<IEmotionStatus[]>([]);
  selectedEmotions = input<IEmotionStatus[]>([]);
  emotionIdFilter = input<number[]>([2, 7, 9, 24, 30]);
  selectedEmotionsChange = output<IEmotionStatus[]>();
  selectedEmotionsCurrent: IEmotionStatus[] = [];
  filteredEmotions!: IEmotionStatus[];
  remainingEmotions!: IEmotionStatus[];
  showMore: boolean = false;
  emotionData!: IEmotionStatus[];

  constructor() {}

  ngOnInit(): void {
    const emotions = this.emotionInfo();
    if (emotions) {
      this.filteredEmotions = emotions.filter((emotion: any) =>
        this.emotionIdFilter().includes(emotion.id)
      );
      this.remainingEmotions = emotions.filter(
        (emotion: any) => !this.emotionIdFilter().includes(emotion.id)
      );
    }
    this.selectedEmotionsCurrent = this.selectedEmotions();
    if (this.selectedEmotions().length > 0) {
      this.showMore = true;
    }
  }

  showMoreSelect() {
    this.showMore = !this.showMore;
  }

  selectEmotion2(emotion: IEmotionStatus): void {
    this.emotionData.push(emotion);
  }

  selectEmotion(emotion: IEmotionStatus): void {
    const index = this.selectedEmotions().findIndex((e) => e.id === emotion.id);
    if (index === -1) {
      this.selectedEmotions().push(emotion);
    } else {
      this.selectedEmotions().splice(index, 1);
    }
    this.selectedEmotionsChange.emit(this.selectedEmotions());
  }

  isSelected(emotion: IEmotionStatus): boolean {
    return this.selectedEmotions().some((e) => e.id === emotion.id);
  }
}