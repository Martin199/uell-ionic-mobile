import { AnimationController } from '@ionic/angular';

// Animación de entrada
export const modalEnterAnimation = (baseEl: HTMLElement) => {
  const animationCtrl = new AnimationController();
  const root = baseEl.shadowRoot;

  const backdropElement = root?.querySelector('ion-backdrop');
  const wrapperElement = root?.querySelector('.modal-wrapper');


  const backdropAnimation = animationCtrl
    .create()
    .addElement(backdropElement || baseEl)
    .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  const wrapperAnimation = animationCtrl.create();

  if (wrapperElement) {
    wrapperAnimation.addElement(wrapperElement).keyframes([
      { offset: 0, opacity: '0', transform: 'scale(0)' },
      { offset: 1, opacity: '0.99', transform: 'scale(1)' },
    ]);
  }

  return animationCtrl
    .create()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(300  )
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

// Animación de salida
export const modalLeaveAnimation = (baseEl: HTMLElement) => {
  return modalEnterAnimation(baseEl).direction('reverse');
};