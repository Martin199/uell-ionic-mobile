import { Component, input } from '@angular/core';
import { IonPopover, IonIcon, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-help-popover',
  templateUrl: './help-popover.component.html',
  styleUrls: ['./help-popover.component.scss'],
  imports: [IonContent, IonIcon, IonPopover],
})
export class HelpPopoverComponent {
  text = input.required<string>();
}
