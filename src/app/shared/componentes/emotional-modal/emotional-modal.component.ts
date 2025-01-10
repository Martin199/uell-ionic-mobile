import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { UserService } from 'src/app/services/user.service';

register();

@Component({
  selector: 'app-emotional-modal',
  templateUrl: './emotional-modal.component.html',
  styleUrls: ['./emotional-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmotionalModalComponent implements OnDestroy, AfterViewInit {

  @ViewChild('swiper') swiper!: Swiper;
  @Input() userName!: string;
  @Input() userId!: number;

  public emojiList = [
    { id: 0, urlSvg: 'assets/emotional-icons/optimismo.svg', urlGif: 'assets/emotional-icons/optimismo.gif', label: 'optimismo' },
    { id: 1, urlSvg: 'assets/emotional-icons/confianza.svg', urlGif: 'assets/emotional-icons/confianza.gif', label: 'confianza' },
    { id: 2, urlSvg: 'assets/emotional-icons/felicidad.svg', urlGif: 'assets/emotional-icons/felicidad.gif', label: 'felicidad' },
    { id: 3, urlSvg: 'assets/emotional-icons/enojo.svg', urlGif: 'assets/emotional-icons/enojo.gif', label: 'enojo' },
    { id: 4, urlSvg: 'assets/emotional-icons/tristeza.svg', urlGif: 'assets/emotional-icons/tristeza.gif', label: 'tristeza' },
    { id: 5, urlSvg: 'assets/emotional-icons/disgusto.svg', urlGif: 'assets/emotional-icons/disgusto.gif', label: 'disgusto' },
  ];
  paginationBulletValue = [0,1,2,3,4,5]
  indexPagination = 2;
  indexPaginationValue = 5;
  public indexSwiper = 2;
  public animationSwiperNext = false;
  public animationSwiperPrev = false;
  public loadEmoji = false;
  firstSlide = false;
  private observer!: MutationObserver;
  private isManualChange = false;

  slideOptions: SwiperOptions = {
    initialSlide: this.indexSwiper,
    slidesPerView: 5,
    centeredSlides: true,
    direction: 'horizontal',
    speed: 600,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
    on: {
      slideChange: () => {
        this.indexSwiper = this.swiper.realIndex;
        this.indexPagination = this.swiper.realIndex;
      },
    },
  };

  constructor( private modalCtrl: ModalController,
                private userService: UserService
  ) {}

  isSlideDisabled(emoji: any): boolean {
    return emoji.id !== this.indexSwiper;
  }

  getIndexPagination(value: number){
    return this.indexPagination = this.paginationBulletValue.indexOf(value);
  }

  onSlideChange(event: any) {
      const swiperInstance = event.target.swiper; // Obtén la instancia del Swiper
      this.indexSwiper = swiperInstance.realIndex; // Actualiza el índice del slide activo
      this.indexPagination = swiperInstance.realIndex; // Sincroniza con la paginación, si es necesario
  }

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initObserver(): void {
    const swiperContainer = document.querySelector('.swiper');
    if (!swiperContainer) return;

    this.observer = new MutationObserver(() => {
      if (this.isManualChange) {
        this.isManualChange = false;
        return;
      }

      const activeSlide = document.querySelector('.swiper-slide-active');
      if (activeSlide) {
        const index = Array.from(activeSlide.parentElement!.children).indexOf(activeSlide);
        this.indexSwiper = index;
        this.indexPagination = index;
      }
    });

    this.observer.observe(swiperContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  async onClick(index: number) {

    this.isManualChange = true;
    this.indexSwiper = index;
    this.indexPagination = index;
    const swiperContainer = document.querySelector('.swiper') as HTMLElement & { swiper?: Swiper };
    const swiperInstance = swiperContainer?.swiper; 
    if (swiperInstance) {
      swiperInstance.slideTo(this.indexSwiper);
    }
    
  }

  saveEmotion() {
    this.loadEmoji = true;
    this.userService
      .postEmotional(this.userId, this.indexSwiper + 1)
      .pipe(map((res: any) => res.content))
      .subscribe(
        (res: any) => {
          localStorage.setItem('emojiData', JSON.stringify(res));
          this.loadEmoji = false;
          this.modalCtrl.dismiss({ emojiData: res });
        },
        () => {
          this.loadEmoji = false;
        }
      );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  
  ionSlideNextStart(event: any){
    if (this.firstSlide)
      event.target.swiper.slideNext();
    this.animationSwiperNext = true;
    this.indexSwiper = event.target.swiper.realIndex;
    this.indexPagination = event.target.swiper.realIndex;
  }

  ionSlideNextEnd(event: any){
    this.animationSwiperNext = false;
    this.firstSlide = true;
  }

  ionSlidePrevStart(event: any){
    event.target.swiper.slidePrev();
    this.animationSwiperPrev = true;
    this.indexSwiper = event.target.swiper.realIndex;
    this.indexPagination = event.target.swiper.realIndex;
  }

  ionSlidePrevEnd(event: any){
    this.animationSwiperPrev = false;
  }
}

