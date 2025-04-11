import { Component, inject } from '@angular/core';
import { UellCoinService } from 'src/app/services/uell-coin.service';

@Component({
  selector: 'app-uell-coin',
  templateUrl: './uell-coin.component.html',
  styleUrls: ['./uell-coin.component.scss'],
})
export class UellCoinComponent {
  uellCoinService = inject(UellCoinService);
  showCoin = false;
  startAnimation = false;

  constructor() {
    this.uellCoinService.trigger$.subscribe(() => {
      this.animateCoin();
    });
  }

  animateCoin() {
    this.showCoin = true;
    this.startAnimation = false;

    const audio = new Audio('assets/sounds/coin.mp3');
    audio.volume = 0.5;
    audio.play();

    // Damos 50ms para forzar que Angular actualice el DOM antes de activar la animación
    setTimeout(() => {
      this.startAnimation = true;
    }, 50);

    // Ocultamos a los 6 segundos
    setTimeout(() => {
      this.showCoin = false;
      this.startAnimation = false;
    }, 6000);
  }
}
