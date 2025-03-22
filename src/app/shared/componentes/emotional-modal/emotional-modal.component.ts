import { AfterViewInit, Component, inject, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { UserService } from 'src/app/services/user.service';
import { emojiList } from './constants/emojiList';
import { ContentEmotional, Emoji, EmotionalResponse } from '../../interface/mental-status.interfaces';
 
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

  emojiList= emojiList;
  paginationBulletValue : number[] = [0,1,2,3,4,5]
  indexPagination : number = 2;
  indexPaginationValue : number = 5;
  indexSwiper : number = 2;
  loadEmoji : boolean = false;
  observer!: MutationObserver;
  isManualChange : boolean = false;

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
      init: (swiper) => {
        swiper.wrapperEl.style.alignItems = 'center';
      },
      slideChange: () => {
        this.indexSwiper = this.swiper.realIndex;
        this.indexPagination = this.swiper.realIndex;
      },
    },
  };
  
  modalCtrl = inject(ModalController)
  userService = inject (UserService)

  constructor() {}

  isSlideDisabled(emoji: Emoji): boolean {
    return emoji.id !== this.indexSwiper;
  }

  getIndexPagination(value: number){
    return this.indexPagination = this.paginationBulletValue.indexOf(value);
  }

  onSlideChange(event: Event) {
      const swiperInstance = (event.target as any).swiper as Swiper;
      this.indexSwiper = swiperInstance.realIndex; 
      this.indexPagination = swiperInstance.realIndex;
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
      .pipe(map((res: EmotionalResponse) => res.content))
      .subscribe(
        (res: ContentEmotional) => {
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

}

