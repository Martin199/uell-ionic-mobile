import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-multimedia-iframe',
  templateUrl: './multimedia-iframe.component.html',
  styleUrls: ['./multimedia-iframe.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MultimediaIframeComponent {

  @Input() url: string = ''
  isPlaying: boolean = false;
  sanitizedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  playVideo() {
    const videoUrl = `${this.url}?autoplay=1`;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    this.isPlaying = true;
  }

  getYouTubeThumbnail(url: string): string { const videoId = url.split('embed/')[1]; return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }

}
