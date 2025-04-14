import { Component, inject } from '@angular/core';
import { ISearchbarAnimation } from 'src/app/shared/interface/searchbar-animation-interfaces';
import { ICarouselWellnessPortal, IWellnessPortalPost } from '../../interfaces/wellness-portal-interfaces';
import { WellnessPortalService } from 'src/app/services/wellness-portal.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-wellness-portal',
  templateUrl: './wellness-portal.page.html',
  styleUrls: ['./wellness-portal.page.scss'],
})
export class WellnessPortalPage {

  dataFindPost: ISearchbarAnimation[] = [];

  dataRecommendedForYou: ICarouselWellnessPortal[] = [];
  dataMostViewed: ICarouselWellnessPortal[] = [];
  dataMostViewedByTenant: ICarouselWellnessPortal[] = [];
  dataMostLiked: ICarouselWellnessPortal[] = [];
  dataBienestarFisico: ICarouselWellnessPortal[] = [];
  dataGestionEmocional: ICarouselWellnessPortal[] = [];
  dataSaludMental: ICarouselWellnessPortal[] = [];

  constructor() {
    this.getWellnessData();
  }

  wellnessPortalService = inject(WellnessPortalService);
  // router = inject(Router);
  utilsService = inject(UtilsService);

  async getWellnessData() {
    this.getAllPosts();

    this.getRecommendedForYou('RECOMENDADO_PARA_VOS', 3);
    this.getMostViewed('MAS_VISTOS', 5);

    this.getMostLiked('MAS_LIKEADOS', 5);
    this.getWellnessPortalGeneralCategories('BIENESTAR_FISICO', 10);
    this.getWellnessPortalGeneralCategories('GESTION_EMOCIONAL', 10);
    this.getWellnessPortalGeneralCategories('SALUD_MENTAL', 10);
  }

  async getAllPosts() {
    const loading = await this.utilsService.loading();
    await loading.present();
    this.wellnessPortalService.getAllPosts().subscribe({
      next: (res: any) => {
        if(res && res.length > 0) {
          this.dataFindPost = res.map((item: any) => ({
            title: item.title,
            id: item.id
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      loading.dismiss();
      },
    });
  }

  // RECOMMENDED_FOR_YOU
  getRecommendedForYou(contentType: string, size?: number) {
    this.wellnessPortalService.getWellnessPortalData(contentType, size).subscribe({
      next: (res: any) => {
        if(res && res.length > 0) {
          this.dataRecommendedForYou = res.map((item: IWellnessPortalPost) => ({
            title: item.title,
            subtitle: item.subtitle,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  // MOST_VIEWED
  getMostViewed(contentType: string, size?: number) {
    this.wellnessPortalService.getWellnessPortalData(contentType, size).subscribe({
      next: (res: any) => {
        if(res && res.length > 0) {
          this.dataMostViewed = res.map((item: IWellnessPortalPost) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.getMostViewedByTenant('MAS_VISTOS_POR_TENANT', 5);
      },
    });
  }
    
  // MOST_VIEWED_BY_TENANT
  getMostViewedByTenant(contentType: string, size?: number) {
    this.wellnessPortalService.getWellnessPortalData(contentType, size).subscribe({
      next: (res: any) => {
        if(res && res.length > 0) {
          this.dataMostViewedByTenant = res.map((item: IWellnessPortalPost) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.orderCarrusel()
      },
    });
  }
  
  orderCarrusel() {
    if (this.dataMostViewed.length === this.dataMostViewedByTenant.length && this.dataMostViewed
      .every((item, index) => item.id === this.dataMostViewedByTenant[index].id)) {
        this.dataMostViewedByTenant = this.dataMostViewedByTenant.sort(() => Math.random() - 0.5);
      }
  }

  // MOST_LIKED
  getMostLiked(contentType: string, size?: number) {
    this.wellnessPortalService.getWellnessPortalData(contentType, size).subscribe({
      next: (res: any) => {
        if(res && res.length > 0) {
          this.dataMostLiked = res.map((item: IWellnessPortalPost) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  getWellnessPortalGeneralCategories(contentType: string, size?: number) {
    this.wellnessPortalService.getWellnessPortalData(contentType, size).subscribe({
      next: (res: any) => {
        if (contentType==="BIENESTAR_FISICO" && res.length > 0) {
          this.dataBienestarFisico = res.map((item: any) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
        if ((contentType==="GESTION_EMOCIONAL" && res.length > 0)) {
          this.dataGestionEmocional = res.map((item: any) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
        if ((contentType==="SALUD_MENTAL" && res.length > 0)) {
          this.dataSaludMental = res.map((item: any) => ({
            title: item.title,
            id: item.id,
            img: item.title_image?.url || null,
            multimedia: item.multiMediaUrl,
            publishAt: item.publishAt ? item.publishAt : null,
          }));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  redirectToPost(idPost: any) {
    this.utilsService.navCtrl.navigateRoot([`tabs/wellness-portal/details/${idPost}`])
  }

}
