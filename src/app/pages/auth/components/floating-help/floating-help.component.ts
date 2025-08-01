import { Component, inject } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-floating-help',
  templateUrl: './floating-help.component.html',
  styleUrls: ['./floating-help.component.scss'],
  imports: [IonIcon, IonFabButton, IonFab],
})
export class FloatingHelpComponent {
  private utils = inject(UtilsService);

  navigateToSupport() {
    this.utils.navigateTo('auth/support');
  }
}
