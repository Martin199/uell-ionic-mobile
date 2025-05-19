import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-uell-multimedia',
    templateUrl: './uell-multimedia.component.html',
    styleUrls: ['./uell-multimedia.component.scss'],
    standalone: false
})
export class UellMultimediaComponent implements OnInit {
  @Input() url: string = '';
  @Input() borderRadius: boolean = false;
  @Output() loading = new EventEmitter<void>();
  videoId: string = '';

  constructor() {}

  ngOnInit(): void {
    this.videoId = this.getYoutubeVideoId(this.url);
    this.loading.emit();
  }

  getYoutubeVideoId(url: string): string {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
}
