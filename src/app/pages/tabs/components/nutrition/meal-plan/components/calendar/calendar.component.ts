import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { eachDayOfInterval, endOfWeek, format, isSameDay, isToday, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { daysLabels } from 'src/app/pages/tabs/components/nutrition/meal-plan/const/calendar-cosnt';
import { IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [IonLabel, IonSpinner, CommonModule],
})
export class CalendarComponent implements OnInit {
  selectedDate = output<Date>();
  currentYear: number = Number(format(new Date(), 'yyyy'));
  currentMonthName: string = format(new Date(), 'LLLL', { locale: es });
  loading: boolean = false;
  selectedDay: Date = new Date();
  weekDays: Date[] = [];
  daysLabels = daysLabels;
  todayDay: number = new Date().getDate();

  ngOnInit() {
    this.loading = true;
    this.generateWeekDates();
    this.selectDay(new Date());
    this.loading = false;
  }

  generateWeekDates(): void {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    this.weekDays = eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
  }

  selectDay(day: Date): void {
    this.selectedDay = day;
    this.selectedDate.emit(day);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isSelected(date: Date): boolean {
    return isSameDay(date, this.selectedDay);
  }

  getDayClass(date: Date): string {
    if (this.isSelected(date)) {
      return 'calendar__day--selected';
    }
    if (this.isToday(date)) {
      return 'calendar__current-day';
    }
    return 'calendar__day';
  }
}
