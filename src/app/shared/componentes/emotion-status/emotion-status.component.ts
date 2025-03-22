import { Component, input, OnInit, output } from '@angular/core';
import { IEmotionStatus } from '../../interface/mental-status.interfaces';

@Component({
  selector: 'app-emotion-status',
  templateUrl: './emotion-status.component.html',
  styleUrls: ['./emotion-status.component.scss'],
})
export class EmotionStatusComponent implements OnInit{

  emotionInfo = input<IEmotionStatus[]>([]);
  selectedEmotions = input<IEmotionStatus[]>([]);
  emotionIdFilter = input<number[]>([2, 7, 9, 24, 30]);
  selectedEmotionsChange  = output<IEmotionStatus[]>();
  selectedEmotionsCurrent: IEmotionStatus[] = [];
  filteredEmotions!: IEmotionStatus[]
  remainingEmotions!: IEmotionStatus[]
  showMore: boolean = false;
  emotionData!: IEmotionStatus[];

  constructor() { }

  ngOnInit(): void {
    const emotions = this.emotionInfo();
    if(emotions) {
      this.filteredEmotions = emotions.filter((emotion: any) => this.emotionIdFilter().includes(emotion.id));
      this.remainingEmotions = emotions.filter((emotion: any) => !this.emotionIdFilter().includes(emotion.id));   
    }
    this.selectedEmotionsCurrent = this.selectedEmotions()
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
    const index = this.selectedEmotions().findIndex(e => e.id === emotion.id);
    if (index === -1) {
        this.selectedEmotions().push(emotion);
    } else {
        this.selectedEmotions().splice(index, 1);
    }
    this.selectedEmotionsChange.emit(this.selectedEmotions());
  }

  isSelected(emotion: IEmotionStatus): boolean {
    return this.selectedEmotions().some(e => e.id === emotion.id);
  }
}

[
  {
      "id": 1,
      "description": "Agobio",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 2,
      "description": "Agotamiento",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 3,
      "description": "Alegría",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 4,
      "description": "Alivio",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 5,
      "description": "Ansiedad",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 6,
      "description": "Asombro",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 7,
      "description": "Calma",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 8,
      "description": "Celos",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 9,
      "description": "Complacencia",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 10,
      "description": "Confianza",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 11,
      "description": "Culpa",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 12,
      "description": "Decepción",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 13,
      "description": "Desagrado",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 14,
      "description": "Desaliento",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 15,
      "description": "Desesperanza",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 16,
      "description": "Diversión",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 17,
      "description": "Enojo",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 18,
      "description": "Entusiasmo",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 19,
      "description": "Esperanza",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 20,
      "description": "Estrés",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 21,
      "description": "Felicidad",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 22,
      "description": "Frustración",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 23,
      "description": "Gratitud",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 24,
      "description": "Indiferencia",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 25,
      "description": "Irritabilidad",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 26,
      "description": "Miedo",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 27,
      "description": "Molestia",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 28,
      "description": "Orgullo",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 29,
      "description": "Pasión",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 30,
      "description": "Paz",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 31,
      "description": "Pena",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 32,
      "description": "Preocupación",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 33,
      "description": "Satisfacción",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 34,
      "description": "Soledad",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 35,
      "description": "Sorpresa",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 36,
      "description": "Tristeza",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 37,
      "description": "Valentía",
      "imgReference": null,
      "emotionalColor": null
  },
  {
      "id": 38,
      "description": "Vergüenza",
      "imgReference": null,
      "emotionalColor": null
  }
]
