import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
  @Input() height150px: boolean = false;
  isPlaying: boolean = false;
  sanitizedUrl!: SafeResourceUrl;

  constructor() { }

  sanitizer = inject(DomSanitizer);

  playVideo() {
    const videoUrl = `${this.url}?autoplay=1`;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    this.isPlaying = true;
  }

  getYouTubeThumbnail(url: string): string { const videoId = url.split('embed/')[1]; return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }

}
