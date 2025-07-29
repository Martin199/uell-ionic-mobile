import { Component, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ProfileCard } from '../../const/my-profile-fields';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  imports: [IonIcon],
})
export class ProfileCardComponent {
  card = input.required<ProfileCard>();
  editModal = output<string>();

  edit() {
    this.editModal.emit(this.card().type);
  }
}
