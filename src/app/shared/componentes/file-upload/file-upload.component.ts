import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { IonicModule } from '@ionic/angular';

import { CameraService } from 'src/app/services/camera.service';
import { ImageClass } from 'src/app/services/interfaces/camera.interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class FileUploadComponent implements OnInit {
  @Input() title: string = 'Cargue un archivo';
  @Output() fileUploaded: EventEmitter<ImageClass | null> =
    new EventEmitter<ImageClass | null>();
  private cameraService = inject(CameraService);
  fileSelected: ImageClass | null = null;

  async takePicture() {
    if (Capacitor.isNativePlatform()) {
      const cameraPermission = await Camera.checkPermissions();
      const filesystemPermission = await Filesystem.checkPermissions();

      if (cameraPermission.camera !== 'granted') {
        const cameraRequest = await Camera.requestPermissions();
        if (cameraRequest.camera !== 'granted') {
          console.error('Camera permission not granted');
          return;
        }
      }

      if (!filesystemPermission.publicStorage) {
        const filesystemRequest = await Filesystem.requestPermissions();
        if (!filesystemRequest.publicStorage) {
          console.error('Filesystem permission not granted');
          return;
        }
      }
    }
    try {
      const imageData = await this.cameraService.takePicture();
      this.fileSelected = imageData;
      this.fileUploaded.emit(this.fileSelected);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  deleteFile() {
    this.fileSelected = null;
    this.fileUploaded.emit(null);
  }

  ngOnInit() {}
}
