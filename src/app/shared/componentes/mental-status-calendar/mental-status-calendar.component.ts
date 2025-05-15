import { Component, computed, effect, inject, Input } from '@angular/core';
import { IEmotionalMapResponse, IMoodDayList } from '../../interface/mental-status.interfaces';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { ModalMentalStatusDescriptionComponent } from '../modals-components/modal-mental-status-description/modal-mental-status-description.component';
import { ModalController } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { addIcons } from "ionicons";
import { chevronBack, chevronForward } from "ionicons/icons";

type CalendarDay = Date | null;

@Component({
    selector: 'app-mental-status-calendar',
    templateUrl: './mental-status-calendar.component.html',
    styleUrls: ['./mental-status-calendar.component.scss'],
    standalone: false
})
export class MentalStatusCalendarComponent {
    mentalStatusService = inject(MentalStatusService);
    storageService = inject(StorageService);
    modalCtrl = inject(ModalController);
    private userState = inject(UserStateService);

    private userId = computed(() => this.userState.userId());
    @Input() emotionMapData: IMoodDayList[] = [];
    currentDate: Date = new Date();
    currentYear: number | null = null;
    currentMonth: number | null = null;
    weeks: CalendarDay[][] = [];
    loading = false;

    constructor() {
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.mentalStatusService.refreshToCurrentMonth$.subscribe(() => {
            this.goToCurrentMonth();
        });
        effect(() => {
            if (!this.userId()) {
                console.error('MentalStatusCalendarComponent: No se puede obtener el id del usuario');
                return;
            }
            this.goToCurrentMonth();
        });
        addIcons({ chevronBack, chevronForward });
    }

    goToCurrentMonth(): void {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.refreshEmotionalMap();
    }

    async refreshEmotionalMap() {
        this.currentMonth = this.currentMonth ? this.currentMonth : 0;
        const key = `${this.currentYear}-${this.currentMonth + 1}`;
        const today = new Date();
        const isCurrentMonth =
            this.currentYear === today.getFullYear() &&
            this.currentMonth === today.getMonth();
        this.loading = true;
        if (!isCurrentMonth) {
            const cachedData = this.mentalStatusService.getCachedMonth(key);
            if (cachedData) {
                this.emotionMapData = cachedData;
                this.generateCalendar();
                this.loading = false;
                return;
            }
        }
        const userId = this.userId();
        if (!userId) {
            console.error('refreshEmotionalMap: No se puede obtener el id del usuario');
            return;
        }
        this.mentalStatusService
            .getEmotionalMap(userId, this.currentYear!, this.currentMonth + 1)
            .subscribe({
                next: (res: IEmotionalMapResponse) => {
                    this.emotionMapData = res?.moodDayList ? res.moodDayList : [];
                    if (!isCurrentMonth) {
                        this.mentalStatusService.setCachedMonth(key, this.emotionMapData);
                    }
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    this.generateCalendar();
                    this.loading = false;
                },
            });
    }

    generateCalendar(): void {
        this.currentMonth = this.currentMonth ? this.currentMonth : 0;
        this.weeks = [];
        const firstDay = new Date(this.currentYear!, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear!, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        let startingDayOfWeek = firstDay.getDay();
        let dayCount = 1;

        while (dayCount <= daysInMonth) {
            const week: CalendarDay[] = [];
            for (let i = 0; i < 7; i++) {
                if (
                    (dayCount === 1 && i < startingDayOfWeek) ||
                    dayCount > daysInMonth
                ) {
                    week.push(null);
                } else {
                    week.push(new Date(this.currentYear!, this.currentMonth, dayCount));
                    dayCount++;
                }
            }
            this.weeks.push(week);
        }
    }

    nextMonth(): void {
        this.currentMonth = this.currentMonth ? this.currentMonth : 0;
        const today = new Date();
        const isSameYear = this.currentYear === today.getFullYear();
        const isNextMonth = this.currentMonth + 1 > today.getMonth() && isSameYear;
        if (isNextMonth) return;
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear = this.currentYear! + 1;
        } else {
            this.currentMonth = this.currentMonth + 1;
        }
        this.refreshEmotionalMap();
    }

    previousMonth(): void {
        this.currentMonth = this.currentMonth ? this.currentMonth : 0;
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear = this.currentYear! - 1;
        } else {
            this.currentMonth = this.currentMonth - 1;
        }
        this.refreshEmotionalMap();
    }

    getMonthName(): string {
        this.currentMonth = this.currentMonth ? this.currentMonth : 0;
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        return months[this.currentMonth];
    }

    isCurrentMonth(day: CalendarDay): boolean {
        return (
            day !== null &&
            day.getMonth() === this.currentMonth &&
            day.getFullYear() === this.currentYear
        );
    }

    async onDayClick(day: CalendarDay): Promise<void> {
        if (day !== null && this.isCurrentMonth(day)) {
            const dayNumber = day.getDate();
            const emotionalDay = this.emotionMapData.find((d) => d.day === dayNumber);
            if (emotionalDay?.moodId) {
                const modal = await this.modalCtrl.create({
                    component: ModalMentalStatusDescriptionComponent,
                    componentProps: { modDayData: emotionalDay },
                    cssClass: 'modal-mental-status',
                    backdropDismiss: false,
                    showBackdrop: true,
                    keyboardClose: false,
                    mode: 'ios',
                });
                await modal.present();
            }
        }
    }

    getEmotionalColor(day: CalendarDay): string | null {
        if (day === null || !this.isCurrentMonth(day)) return null;
        const dayNumber = day.getDate();
        const emotionalDay = this.emotionMapData.find((d) => d.day === dayNumber);
        return emotionalDay ? emotionalDay.emotionalColor : null;
    }

    getEmotionalDescription(day: CalendarDay): string | null {
        if (day === null || !this.isCurrentMonth(day)) return null;
        const dayNumber = day.getDate();
        const emotionalDay = this.emotionMapData.find((d) => d.day === dayNumber);
        return emotionalDay?.description ? emotionalDay.description : null;
    }
}
