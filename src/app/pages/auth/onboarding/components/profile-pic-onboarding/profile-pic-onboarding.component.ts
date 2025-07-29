import { Component, computed, inject, input, resource } from '@angular/core';
import { IonIcon, IonImg } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';
import { ProfilePicModalComponent } from '../modals/profile-pic-modal/profile-pic-modal.component';
import { firstValueFrom, of } from 'rxjs';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { Base64UploadService } from 'src/app/services/base64-upload.service';

@Component({
  selector: 'app-profile-pic-onboarding',
  templateUrl: './profile-pic-onboarding.component.html',
  styleUrls: ['./profile-pic-onboarding.component.scss'],
  imports: [IonImg, IonIcon],
})
export class ProfilePicOnboardingComponent {
  utils = inject(UtilsService);
  userStateService = inject(UserStateService);
  base64UploadService = inject(Base64UploadService);

  profilePicResource = resource({
    params: () => ({ fileName: this.userStateService.userData()?.photo }),
    loader: ({ params }) => {
      if (!params.fileName) return firstValueFrom(of(null));
      return firstValueFrom(this.base64UploadService.downloadFile(params.fileName));
    },
  });

  image = computed(() => {
    const imageDownloaded = this.profilePicResource.value();
    if (imageDownloaded) {
      return imageDownloaded;
    }
    return 'assets/login/person.svg';
  });

  getImage() {
    if (this.profilePicResource.value()) {
      return this.profilePicResource.value();
    }
    return 'assets/login/person.svg';
  }
  edit() {
    const data = {
      image: this.image(),
    };
    this.utils.presentModal(ProfilePicModalComponent, undefined, data);
  }
}
