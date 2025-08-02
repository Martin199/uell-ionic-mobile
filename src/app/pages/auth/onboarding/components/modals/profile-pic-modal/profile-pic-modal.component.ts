import { Component, computed, inject, resource, signal } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { Photo } from '@capacitor/camera';
import { OnBoardingProfilePicPatch } from '../../../interfaces';
import { CameraService } from 'src/app/services/camera.service';
import { Base64UploadService } from '../../../../../../services/base64-upload.service';
import { IUploadFile } from 'src/app/services/interfaces/base64-upload.interface';
import { UserStateService } from '../../../../../../core/state/user-state.service';
import { UserService } from '../../../../../../services/user.service';
import { firstValueFrom, of } from 'rxjs';

export interface ProfilePicModalData {
  currentImage?: string;
}

@Component({
  selector: 'app-profile-pic-modal',
  templateUrl: './profile-pic-modal.component.html',
  styleUrls: ['./profile-pic-modal.component.scss'],
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonImg, SharedModule],
})
export class ProfilePicModalComponent {
  private modalCtrlr = inject(ModalController);
  private cameraService = inject(CameraService);
  private base64UploadService = inject(Base64UploadService);
  private userService = inject(UserService);
  private userStateService = inject(UserStateService);
  private currentImage = signal<Photo | null>(null);

  async openGallery() {
    const image = await this.cameraService.openGallery();
    this.currentImage.set(image);
  }

  async takePhoto() {
    try {
      const image = await this.cameraService.takePhoto();
      this.currentImage.set(image);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  saveImage() {
    this.uploadImage();
    this.modalCtrlr.dismiss({
      profileImage: this.currentImage,
    });
  }

  uploadImage() {
    if (!this.currentImage()) {
      console.error('No image selected');
      return;
    }

    const uoloadFileBody: IUploadFile = {
      fileName: `${this.userStateService.userId()}_${new Date().getTime()}.${this.currentImage()!.format}`,
      fileContent: this.currentImage()!.dataUrl,
    };

    this.base64UploadService.uploadFile(uoloadFileBody).subscribe(res => {
      const body: OnBoardingProfilePicPatch = {
        photo: res,
      };
      this.userService.postOnBoarding(body).subscribe(res => {
        this.userStateService.setUser(res);
      });
    });
  }

  getImage() {
    if (this.currentImage()) {
      return this.currentImage()!.dataUrl;
    }
    return 'assets/login/person.svg';
  }

  dismiss() {
    this.modalCtrlr.dismiss();
  }
}
