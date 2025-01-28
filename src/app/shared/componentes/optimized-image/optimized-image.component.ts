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
  @Input() height150px: boolean = false;
  @Input() url: string = '';

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
            this.imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY8cq53evFoKvhcEMFYQonH2OYhJ__N0dL9w&s'
          }
        },
        error: (err) => {
          console.error(err);
          this.imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY8cq53evFoKvhcEMFYQonH2OYhJ__N0dL9w&s'
        },
        complete: () => {},
      });
    }
  }

}
