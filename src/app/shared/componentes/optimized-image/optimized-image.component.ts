import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  @Input() height130px: boolean = false;
  @Input() height250px: boolean = false;
  @Input() url: string = '';
  @Output() loading = new EventEmitter<void>();

  constructor() { }

  filesService = inject(FilesService);

  imgSrc: string | null = null;

  ngOnInit() {
    if (this.url) {
      this.filesService.downloadFile(this.url).subscribe({
        next: (res: string) => {
          if (res) { 
            this.imgSrc = res;
          } else {
            this.imgSrc ='../../../../assets/imgs/Uell_Img.jpg';
          }
        },
        error: (err) => {
          console.error(err);
          this.imgSrc ='../../../../assets/imgs/Uell_Img.jpg';
        },
        complete: () => {
          this.loading.emit();
        },
      });
    }
  }

}
