import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-uell-multimedia',
    templateUrl: './uell-multimedia.component.html',
    styleUrls: ['./uell-multimedia.component.scss'],
    standalone: false
})
export class UellMultimediaComponent {

  @Input() url: string = ''
  isPlaying: boolean = false;
  sanitizedUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  playVideo() {
    const videoUrl = `${this.url}?autoplay=1`;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    this.isPlaying = true;
  }

  getYouTubeThumbnail(url: string): string { const videoId = url.split('embed/')[1]; return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }


}
