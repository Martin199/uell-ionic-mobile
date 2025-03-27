import { Component, input, OnInit, output } from '@angular/core';
import { IMoodDayList } from '../../interface/mental-status.interfaces';

type CalendarDay = Date | null;

@Component({
  selector: 'app-emotions-calendar',
  templateUrl: './emotions-calendar.component.html',
  styleUrls: ['./emotions-calendar.component.scss'],
})
export class EmotionsCalendarComponent implements OnInit {

  changeMonth = output<{year: number, month: number}>();

  currentDate: Date = new Date();
  currentYear: number;
  currentMonth: number;
  weeks: CalendarDay[][] = [];
  emotionMapData = input<IMoodDayList[]>([]);

  constructor() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.generateCalendar();
  }

  ngOnInit() {
    console.log(`Año: ${this.currentYear}, Mes: ${this.currentMonth + 1}`);
  }

  // Genera la estructura del calendario
  generateCalendar(): void {
    this.weeks = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Ajuste para que la semana empiece en Domingo (0)
    let startingDayOfWeek = firstDay.getDay(); // 0=Domingo, 1=Lunes, etc.
    let dayCount = 1;
    // Generar las semanas
    while (dayCount <= daysInMonth) {
      const week: CalendarDay[] = []; // Usamos el tipo CalendarDay
      // Llenar la semana
      for (let i = 0; i < 7; i++) {
        if (
          (dayCount === 1 && i < startingDayOfWeek) ||
          dayCount > daysInMonth
        ) {
          // Celda vacía para días fuera del mes actual
          week.push(null);
        } else {
          week.push(new Date(this.currentYear, this.currentMonth, dayCount));
          dayCount++;
        }
      }
      this.weeks.push(week);
    }
  }

  // Navegación entre meses
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.refreshCalendar();
    this.generateCalendar();
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.refreshCalendar();
    this.generateCalendar();
  }

  refreshCalendar() {
    this.changeMonth.emit({ year: this.currentYear, month: this.currentMonth});
  }

  // Obtener nombre del mes
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

  onDayClick(day: CalendarDay): void {
    if (day !== null && this.isCurrentMonth(day)) {
      console.log(`Día seleccionado: ${day.getDate()}`);
    }
  }

  // Método para obtener el color emocional de un día específico
  getEmotionalColor(day: CalendarDay): string | null {
    if (day === null || !this.isCurrentMonth(day)) return null;

    const dayNumber = day.getDate();
    const emotionalDay = this.emotionMapData().find((d) => d.day === dayNumber);

    return emotionalDay ? emotionalDay.emotionalColor : null;
  }

  // Método para obtener la descripción emocional (para tooltips)
  getEmotionalDescription(day: CalendarDay): string | null {
    if (day === null || !this.isCurrentMonth(day)) return null;

    const dayNumber = day.getDate();
    const emotionalDay = this.emotionMapData().find((d) => d.day === dayNumber);

    return emotionalDay?.description ? emotionalDay.description : null;
  }
}
