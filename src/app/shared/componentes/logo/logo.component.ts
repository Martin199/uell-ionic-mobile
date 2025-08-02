import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: false,
})
export class LogoComponent {
  branding = input<string | null>(null);
}
