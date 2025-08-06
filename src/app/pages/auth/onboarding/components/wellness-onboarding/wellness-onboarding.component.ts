import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { MoodEnergyWellbeingComponent } from './steps/mood-energy-wellbeing/mood-energy-wellbeing.component';
import { EnergyConcentrationComponent } from './steps/energy-concentration/energy-concentration.component';
import { NutritionLifestyleComponent } from './steps/nutrition-lifestyle/nutrition-lifestyle.component';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  PostWellnessContent,
  MoodEnergyWellbeingPostData,
  EnergyConcentrationPostData,
  NutritionLifestylePostData,
} from 'src/app/services/interfaces/auth-service.interfaces';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { concatMap, catchError, of, tap } from 'rxjs';
import { ISPSService } from 'src/app/services/isps.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { ISPSScore } from 'src/app/pages/tabs/interfaces/isps';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-wellness-onboarding',
  templateUrl: './wellness-onboarding.component.html',
  styleUrls: ['./wellness-onboarding.component.scss'],
  imports: [
    IonProgressBar,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonHeader,
    MoodEnergyWellbeingComponent,
    EnergyConcentrationComponent,
    NutritionLifestyleComponent,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WellnessOnboardingComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<{ swiper: Swiper }>;
  progress = signal(0.33);

  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private utilsService = inject(UtilsService);
  private ispsService = inject(ISPSService);
  private userState = inject(UserStateService);
  tenantParameters = inject(UserStateService).tenantParameters;
  ispsData = signal<ISPSScore | null>(null);

  postWellnessData = signal<PostWellnessContent>({} as PostWellnessContent);
  loadISPS: boolean = false;

    questionGestor: string = '';
    messageThroughCellphone: any;
    viewChoiceMessageThroughCellphone: boolean = true;
    dataIsps: any

  ngAfterViewInit() {
    if (this.swiperContainer.nativeElement) {
      const swiperOptions: SwiperOptions = {
        allowTouchMove: false,
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        loop: false,
      };

      const swiperElementConstructor = this.swiperContainer.nativeElement as any;
      Object.assign(swiperElementConstructor, swiperOptions);
      swiperElementConstructor.initialize();
    }
  }

  nextSlide() {
    this.swiperContainer.nativeElement.swiper.slideNext();
  }

  prevSlide() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
  }

  onMoodEnergyWellbeingResponse(event: MoodEnergyWellbeingPostData) {
    this.postWellnessData.update(prev => ({ ...prev, ...event }));
    this.progress.set(0.66);
    this.nextSlide();
  }

  onEnergyConcentrationResponse(event: EnergyConcentrationPostData) {
    this.postWellnessData.update(prev => ({ ...prev, ...event }));
    this.progress.set(1);
    this.nextSlide();
  }

  onNutritionLifestyleResponse(event: NutritionLifestylePostData) {
    this.postWellnessData.update(prev => ({ ...prev, ...event }));

    const completeWellnessData: PostWellnessContent = this.postWellnessData();
    this.authService
      .postWellnessContent(completeWellnessData)
      .pipe(
        //TODO: descomentar cuando se terminen las pruebas
        // concatMap(() =>
        //   this.userService.postOnBoarding({ onboarded: true }).pipe(tap(res => this.userState.setUser(res)))
        // ),
        concatMap(() => this.ispsService.getISPSScore()),
        catchError((error: any) => {
          console.error('Error posting wellness content:', error);
          return of(null);
        })
      )
      .subscribe({
        next: res => {
          this.ispsData.set(res);
          this.dataIsps = res;
          this.setISPSData();
          //TODO: el navigate se tiene que poner en un nuevo metodo cuando se postea si quiere contacto con el gestor o no
          //* returnQuestionValue
          // this.router.navigate(['/tabs/home'])
        },
        error: (error: any) => {
          console.error('Error posting onboarding status:', error);
        },
      });
  }

  setISPSData() {
    if(this.tenantParameters()){
      this.messageThroughCellphone = this.tenantParameters()!.gestorWillContactYou ? this.tenantParameters()!.gestorWillContactYou : '';
      if ((this.messageThroughCellphone === 'true' || this.messageThroughCellphone === 'false')) {
          this.viewChoiceMessageThroughCellphone = false;
      } else {
          this.messageThroughCellphone = this.tenantParameters()!.gestorWillContactYou
      }
        this.loadISPS = true;
        this.nextSlide();
    }
  }

  returnQuestionValue(value: string) {
    this.questionGestor = value
  }

  goHome() {
    if (this.questionGestor === 'true' || this.questionGestor === 'false') {
        const stepValue = this.questionGestor === 'true' ? true : false;
        const data = {
            messageThroughCellphone: stepValue
        }
        this.finish(data)
    } else {
        const data = {
            messageThroughCellphone: false
        }
        this.finish(data)
    }
  }

  finish(data: any) {
    //TODO: agregar userId
    // this.ispsService.patchIPSContent(this.user.id, data).subscribe(() => {
    //   this.userService.postOnBoarding({ onboarded: true }).subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.router.navigate(['/tabs/home'])
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     },
    //     complete: () => {},
    //   });
    // });
    // (err: Error) => {
    //   console.error(err, 'Error al finalizar el indice de salud psicosocial');
    // };
  }

  onClickBack() {
    if (this.progress() === 1) {
      this.prevSlide();
      this.progress.set(0.66);
    } else if (this.progress() === 0.66) {
      this.prevSlide();
      this.progress.set(0.33);
    } else {
      this.utilsService.goBack();
    }
  }
}
