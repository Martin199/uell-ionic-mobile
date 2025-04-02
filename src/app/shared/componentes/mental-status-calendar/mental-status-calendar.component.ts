import { Component, inject, Input, OnInit } from '@angular/core';
import { IMoodDayList } from '../../interface/mental-status.interfaces';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UserService } from 'src/app/services/user.service';
import { ModalMentalStatusDescriptionComponent } from '../modals-components/modal-mental-status-description/modal-mental-status-description.component';
import { ModalController } from '@ionic/angular';

type CalendarDay = Date | null;

@Component({
    selector: 'app-mental-status-calendar',
    templateUrl: './mental-status-calendar.component.html',
    styleUrls: ['./mental-status-calendar.component.scss'],
})
export class MentalStatusCalendarComponent implements OnInit {
  mentalStatusService = inject(MentalStatusService);
  userService = inject(UserService);
  modalCtrl = inject(ModalController);

  @Input() emotionMapData: IMoodDayList[] = [];
  private cachedMonths: { [key: string]: IMoodDayList[] } = {};
  private _userInfo = this.userService.getUser();
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

  refreshEmotionalMap() {
    const key = `${this.currentYear}-${this.currentMonth + 1}`;
    const today = new Date();
    const isCurrentMonth =
      this.currentYear === today.getFullYear() &&
      this.currentMonth === today.getMonth();
    this.loading = true;

    // Si no es el mes actual y ya está cacheado, usar los datos
    if (!isCurrentMonth && this.cachedMonths[key]) {
      this.emotionMapData = this.cachedMonths[key];
      this.generateCalendar();
      this.loading = false;
      return;
    }

    // Si es el mes actual o no hay caché, hacer el GET
    this.mentalStatusService
      .getEmotionalMap(
        this._userInfo.id,
        this.currentYear,
        this.currentMonth + 1
      )
      .subscribe({
        next: (res: any) => {
          this.emotionMapData = res?.moodDayList ? res.moodDayList : [];
          // Guardar en caché si NO es el mes actual
          if (!isCurrentMonth) {
            this.cachedMonths[key] = this.emotionMapData;
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
          componentProps: { mentalStatusData: emotionalDay },
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
