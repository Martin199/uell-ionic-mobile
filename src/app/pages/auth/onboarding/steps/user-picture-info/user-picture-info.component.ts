import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ImageClass } from 'src/app/services/interfaces/camera.interfaces';
import { FileUploadComponent } from 'src/app/shared/componentes/file-upload/file-upload.component';

@Component({
  selector: 'app-user-picture-info',
  templateUrl: './user-picture-info.component.html',
  styleUrls: ['./user-picture-info.component.scss'],
  imports: [FileUploadComponent],
})
export class UserPictureInfoComponent {
  @Output() profilePicture: EventEmitter<ImageClass | null> =
    new EventEmitter<ImageClass | null>();

  onFileUploaded(file: ImageClass | null) {
    this.profilePicture.emit(file);
  }
}
