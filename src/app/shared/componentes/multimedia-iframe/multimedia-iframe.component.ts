import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-multimedia-iframe',
  templateUrl: './multimedia-iframe.component.html',
  styleUrls: ['./multimedia-iframe.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MultimediaIframeComponent {
  @Input() url: string = '';
  @Input() height150px: boolean = false;
  isPlaying: boolean = false;
  sanitizedUrl!: SafeResourceUrl;

  constructor() {}

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  sanitizer = inject(DomSanitizer);
}
