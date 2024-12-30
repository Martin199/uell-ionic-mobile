import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
    trigger('enterAnimation', [
      transition(':enter', [style({ transform: 'translateX(100%)', opacity: 0 }), animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))]),
      transition(':leave', [style({ transform: 'translateX(0)', opacity: 1 }), animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))])
    ]),
  ],
})
export class AuthPage implements OnInit {

  @ViewChild('userContainer', { static: true }) userContainer!: ElementRef;
  @ViewChild('passwordContainer', { static: true }) passwordContainer!: ElementRef;
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  formAuth = new FormGroup({
    cuil: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.animateElements();
  }

  animateElements() {
    // Animación para el contenedor de usuario
    const userAnimation = this.animationCtrl
      .create()
      .addElement(this.userContainer.nativeElement)
      .duration(500)
      .delay(200)
      .easing('ease-out')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-50px)', 'translateY(0)');

    // Animación para el contenedor de contraseña
    const passwordAnimation = this.animationCtrl
      .create()
      .addElement(this.passwordContainer.nativeElement)
      .duration(500)
      .delay(400)
      .easing('ease-out')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-50px)', 'translateY(0)');

    // Reproduce las animaciones en secuencia
    userAnimation.play();
    passwordAnimation.play();
  }

}
