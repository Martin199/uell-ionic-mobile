import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory } from '@capacitor/filesystem';
import { ImageClass } from './interfaces/camera.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        allowEditing: true,
        promptLabelHeader: 'Cargue una foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Seleccione una foto',
        promptLabelPicture: 'Tome una foto',
      });

      if (!image) throw new Error('No image');
      var imageUrl = image.webPath;
      const format = image.format;

      if (!imageUrl) throw new Error('No image webPath');
      const size = await this.getImageSize(imageUrl!);

      if (!size) throw new Error('No size');
      if (size / (1024 * 1024) > environment.maxImageSize) throw new Error('Image size is too large');

      const base64String = await this.convertUriToBase64(imageUrl);
      if (!base64String) throw new Error('No base64');

      return new ImageClass({ base64String, format, imageUrl, size });
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  }

  public async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        allowEditing: true,
      });
      return image;
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }

  public async openGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        allowEditing: true,
      });
      return image;
    } catch (error) {
      console.error('Error opening gallery:', error);
      throw error;
    }
  }

  private async checkImageValidity(image: Photo) {
    if (!image) throw new Error('No image');
    var imageUrl = image.webPath;
    const format = image.format;

    if (!imageUrl) throw new Error('No image webPath');
    const size = await this.getImageSize(imageUrl!);

    if (!size) throw new Error('No size');
    if (size / (1024 * 1024) > environment.maxImageSize) throw new Error('Image size is too large');

    const base64String = await this.convertUriToBase64(imageUrl);
    if (!base64String) throw new Error('No base64');

    return new ImageClass({ base64String, format, imageUrl, size });
  }

  private async getImageSize(webPath: string) {
    try {
      const response = await fetch(webPath);
      const blob = await response.blob();
      const fileSize = blob.size;
      return fileSize;
    } catch (error) {
      console.error('Error checking file size with Fetch', error);
      return null;
    }
  }

  private async convertUriToBase64(webPath: string): Promise<string | null> {
    try {
      const response = await fetch(webPath);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting URI to Base64', error);
      return null;
    }
  }
}
