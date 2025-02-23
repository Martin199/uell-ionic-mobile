import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {
  // Usamos read: ElementRef para obtener el elemento del DOM del swiper-container
  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer!: ElementRef;
  swiper: any;

  ngAfterViewInit(): void {
    // Utilizamos un setTimeout breve para asegurarnos de que Swiper se haya inicializado
      // Asigna la instancia de Swiper que se genera automáticamente en el custom element
      this.swiper = this.swiperContainer.nativeElement.swiper;
      if (this.swiper) {
        // Deshabilitamos el touch si no queremos que el usuario avance manualmente
        this.swiper.allowTouchMove = false;
        console.log('Instancia de Swiper:', this.swiper);
      } else {
        console.error('La instancia de Swiper no está disponible.');
      }
  }

  nextSlide(): void {
      if ( this.swiperContainer.nativeElement.swiper) {
        this.swiperContainer.nativeElement.swiper.slideNext();
      } else {
        console.error('Swiper no está disponible.');
      }
 
  }

  prevSlide(): void {
    if ( this.swiperContainer.nativeElement.swiper) {
      this.swiperContainer.nativeElement.swiper.slidePrev();
    } else {
      console.error('Swiper no está disponible.');
    }
  }

  validarPasoActual(): boolean {
    // Implementa aquí la lógica de validación para el slide actual.
    // Retorna true si la validación es exitosa o false si no se puede avanzar.
    return true;
  }
}
