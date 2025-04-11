import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UellCoinService {
  private triggerSubject = new Subject<void>();
  trigger$ = this.triggerSubject.asObservable();

  showCoin() {
    this.triggerSubject.next();
  }
}
