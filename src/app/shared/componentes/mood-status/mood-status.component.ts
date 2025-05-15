import { Component, input, OnInit, output } from '@angular/core';
import { IMoodsStatus } from '../../interface/mental-status.interfaces';

@Component({
    selector: 'app-mood-status',
    templateUrl: './mood-status.component.html',
    styleUrls: ['./mood-status.component.scss'],
    standalone: false
})
export class MoodStatusComponent implements OnInit {

    moodsInfo = input<IMoodsStatus[]>()
    moodsData = input<IMoodsStatus>()
    rangeChange = output<IMoodsStatus>()
    selectedValue: number = 3;
    descriptionCurrent: string = 'Neutral';
    currentImage: string = 'assets/imgs/mental-status/mental-status-4.svg';

    constructor() { }

    ngOnInit() {
        const rangeCurrent = this.moodsData() ? this.moodsData()?.id! - 1 : 3;
        this.selectedValue = rangeCurrent;
        this.updateImage(rangeCurrent);
    }

    onRangeChange(event: any) {
        this.selectedValue = event.detail.value;
        this.updateImage(this.selectedValue);
    }

    updateImage(value: number) {
        const moods = this.moodsInfo();
        if (moods) {
            const mood = moods[value];
            this.currentImage = mood.id === 1 ? 'assets/imgs/mental-status/mental-status-1.svg'
                : mood.id === 2 ? 'assets/imgs/mental-status/mental-status-2.svg'
                    : mood.id === 3 ? 'assets/imgs/mental-status/mental-status-3.svg'
                        : mood.id === 4 ? 'assets/imgs/mental-status/mental-status-4.svg'
                            : mood.id === 5 ? 'assets/imgs/mental-status/mental-status-5.svg'
                                : mood.id === 6 ? 'assets/imgs/mental-status/mental-status-6.svg'
                                    : mood.id === 7 ? 'assets/imgs/mental-status/mental-status-7.svg'
                                        : 'assets/imgs/mental-status/mental-status-4.svg';
            this.descriptionCurrent = mood.description;
            this.rangeChange.emit(mood);
        } else {
            console.error('Índice fuera de rango o moodsInfo es undefined');
        }
    }

}
