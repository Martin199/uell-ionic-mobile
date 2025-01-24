import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-optimized-image',
  templateUrl: './optimized-image.component.html',
  styleUrls: ['./optimized-image.component.scss'],
  standalone: true,
  imports: [ CommonModule ],
})
export class OptimizedImageComponent  implements OnInit {

  @Input() borderRadius: boolean = false;

  constructor() { }

  filesService = inject(FilesService);

  imgData: string | null = null;

  ngOnInit() {
    this.filesService.downloadFile('f7880ff6-0a91-4aad-b16c-a063a1d56ad5-null').subscribe({
      next: (res: any) => {
        this.imgData = res;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

}
