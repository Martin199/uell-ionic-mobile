import { Component, inject, Input, OnInit } from '@angular/core';
import { IMoodDayList } from '../../interface/mental-status.interfaces';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { ModalMentalStatusDescriptionComponent } from '../modals-components/modal-mental-status-description/modal-mental-status-description.component';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UserResponseDTO } from 'src/app/core/interfaces/user';

type CalendarDay = Date | null;

@Component({
  selector: 'app-mental-status-calendar',
  templateUrl: './mental-status-calendar.component.html',
  styleUrls: ['./mental-status-calendar.component.scss'],
})
export class MentalStatusCalendarComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);
  storageService = inject(StorageService);
  modalCtrl = inject(ModalController);

  @Input() emotionMapData: IMoodDayList[] = [];
  private user: UserResponseDTO | null = null;
  currentDate: Date = new Date();
  currentYear: number;
  currentMonth: number;
  weeks: CalendarDay[][] = [];
  loading = false;

  constructor() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.mentalStatusService.refreshToCurrentMonth$.subscribe(() => {
      this.goToCurrentMonth();
    });
  }

  goToCurrentMonth(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.refreshEmotionalMap();
  }

  ngOnInit() {
    this.refreshEmotionalMap();
  }

  async refreshEmotionalMap() {
    const key = `${this.currentYear}-${this.currentMonth + 1}`;
    const today = new Date();
    const isCurrentMonth =
      this.currentYear === today.getFullYear() &&
      this.currentMonth === today.getMonth();
    this.loading = true;
    if (!isCurrentMonth) {
      const cachedData = this.mentalStatusService.getCachedMonth(key);
      if (cachedData) {
        console.log(`Usando caché para: ${key}`);
        this.emotionMapData = cachedData;
        this.generateCalendar();
        this.loading = false;
        return;
      }
    }
    this.user = await this.storageService.getSessionStorage('user');
    if (!this.user) {
      console.error('No hay usuario en sesión');
      return;
    }
    this.mentalStatusService
      .getEmotionalMap(this.user.id!, this.currentYear, this.currentMonth + 1)
      .subscribe({
        next: (res: any) => {
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
    this.weeks = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
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
          week.push(new Date(this.currentYear, this.currentMonth, dayCount));
          dayCount++;
        }
      }
      this.weeks.push(week);
    }
  }

  nextMonth(): void {
    const today = new Date();
    const isSameYear = this.currentYear === today.getFullYear();
    const isNextMonth = this.currentMonth + 1 > today.getMonth() && isSameYear;

    if (isNextMonth) return;

    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.refreshEmotionalMap();
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.refreshEmotionalMap();
  }

  getMonthName(): string {
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
