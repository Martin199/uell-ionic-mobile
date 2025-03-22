import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {

  btnFill = input<string>();
  btnPrimary = input<string>();
  onlytBtn = input<string>();
  btnFillDisabled = input<boolean>(false);
  btnPrimaryDisabled = input<boolean>(false);
  onlytBtnDisabled = input<boolean>(false);
  primaryColor = input<boolean>(true);
  clickModalEvent = output<string>();

  constructor() {}

  clickBtnEvent(event: string) {
    this.clickModalEvent.emit(event);
  }

}
