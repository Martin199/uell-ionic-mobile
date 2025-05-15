import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import moment from 'moment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import {
    IFilePostBodyImage,
    IResponsePostLikes,
    IWellnessPortalPost,
} from 'src/app/pages/tabs/interfaces/wellness-portal-interfaces';
import { FilesService } from 'src/app/services/files.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WellnessPortalService } from 'src/app/services/wellness-portal.service';
import { addIcons } from "ionicons";
import { arrowBackSharp } from "ionicons/icons";

@Component({
    selector: 'app-details-wellness-portal',
    templateUrl: './details-wellness-portal.component.html',
    styleUrls: ['./details-wellness-portal.component.scss'],
    standalone: false,
})
export class DetailsWellnessPortalComponent {
    @ViewChild(IonContent, { static: false }) content!: IonContent;
    @ViewChild(IonContent) ionContent!: IonContent;
    @ViewChild('postBody') postBody!: ElementRef<HTMLDivElement>;

    postId: number;
    post!: IWellnessPortalPost;
    likes: number = 0;
    dislikes: number = 0;
    views: number = 0;

    loadImage: boolean = false;
    firstBottom: boolean = true;
    initNgAfterViewInit: any;
    readAlertTimeout: any;

    constructor() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.postId = Number.parseInt(id ?? '0');
        this.getPostById();
        addIcons({ arrowBackSharp });
    }

    utilsService = inject(UtilsService);
    activatedRoute = inject(ActivatedRoute);
    wellnessPortalService = inject(WellnessPortalService);
    filesService = inject(FilesService);
    storageService = inject(StorageService);
    userService = inject(UserService);

    async getPostById() {
        const loading = await this.utilsService.loading();
        await loading.present();
        this.wellnessPortalService
            .getPostById(this.postId)
            .pipe(
                switchMap((resp: IWellnessPortalPost) => {
                    this.post = resp;
                    this.likes = resp.likes ? resp.likes : 0;
                    this.dislikes = resp.dislikes ? resp.dislikes : 0;
                    this.views = resp.views ? resp.views : 0;
                    return resp.body_image?.url
                        ? this.filesService.downloadFile(resp.body_image.url).pipe()
                        : of(null);
                })
            )
            .subscribe({
                next: (res: string | null) => {
                    if (res) {
                        const file: IFilePostBodyImage = {
                            fileName: this.post.body_image.url,
                            fileContent: res,
                        };
                        this.post.title_image.content = file.fileContent
                            ? file.fileContent
                            : '../../../../assets/imgs/Uell_Img.jpg';
                    }
                    this.loadImage = true;
                    loading.dismiss();
                    this.initNgAfterViewInit = setTimeout(() => {
                        this.checkClientHeigth();
                    }, 2000);
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => { },
            });
    }
    public openAsLink(url: string) {
        this.filesService.downloadFile(url).subscribe(
            (res: string) => {
                const extensionFile = url.substr(url.lastIndexOf('.') + 1);
                if (
                    extensionFile !== undefined &&
                    extensionFile.toLowerCase() === 'pdf'
                ) {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = `${res}`;
                    downloadLink.download = `uell-adjunto-${moment().unix()}.pdf`;
                    downloadLink.click();
                } else {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = res;
                    downloadLink.download = `uell-adjunto-${moment().unix()}${extensionFile.toLowerCase()}`;
                    downloadLink.click();
                }
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    onScroll(event: any) {
        if (!this.firstBottom) return;
        this.content.getScrollElement().then((scrollElement) => {
            const scrollTop = scrollElement.scrollTop;
            const scrollHeight = scrollElement.scrollHeight;
            const clientHeight = scrollElement.clientHeight;
            if (scrollTop + clientHeight >= scrollHeight * 0.98) {
                this.firstBottom = false;
                this.showReadAlert();
            }
        });
    }

    checkClientHeigth() {
        this.content.getScrollElement().then((scrollElement) => {
            const scrollHeight = scrollElement.scrollHeight;
            const clientHeight = scrollElement.clientHeight;
            if (clientHeight >= scrollHeight * 0.98) {
                this.firstBottom = false;
                this.showReadAlert();
            }
        });
    }

    countLikes(event: any) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (event && id) {
            this.wellnessPortalService
                .postLikes(parseInt(id), { liked: true, disliked: false })
                .subscribe((reactPost: IResponsePostLikes) => {
                    if (reactPost) {
                        this.wellnessPortalService
                            .readPostlikes(parseInt(id))
                            .subscribe((res) => {
                                this.likes = res.likes;
                                this.dislikes = res.dislikes;
                                if (reactPost.firstTimeLikedOrDisliked) {
                                    //TODO: agregar modal de creditos por dar like/dislike
                                    // this.creditService.modalCredit(PointValue.REACT_BLOG, creditTextLikes);
                                }
                            });
                    }
                });
        }
    }

    countDislikes(event: any) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (event && id) {
            this.wellnessPortalService
                .postLikes(parseInt(id), { disliked: true, liked: false })
                .subscribe((reactPost: IResponsePostLikes) => {
                    if (reactPost && id) {
                        this.wellnessPortalService
                            .readPostlikes(parseInt(id))
                            .subscribe((res) => {
                                this.dislikes = res.dislikes;
                                this.likes = res.likes;
                                if (reactPost.firstTimeLikedOrDisliked) {
                                    //TODO: agregar modal de creditos por dar like/dislike
                                    // this.creditService.modalCredit(PointValue.REACT_BLOG, creditTextLikes);
                                }
                            });
                    }
                });
        }
    }

    checkPostAsRead(id: number) {
        this.wellnessPortalService.checkAsRead(id, 'MOBILE').subscribe(
            (res: any) => {
                if (res?.content?.postReadFirstTime) {
                    this.views = this.views + 1;
                    //TODO: agregar modal de creditos por leer por primera vez
                    // this.creditService.modalCredit(PointValue.READ_BLOG, creditTextRead);
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    getImageName(imageUrl: string): string {
        const parts = imageUrl.split('-');
        const imageNameWithExtension = parts[parts.length - 1];
        return imageNameWithExtension;
    }

    private showReadAlert() {
        this.readAlertTimeout = setTimeout(() => {
            this.checkPostAsRead(this.postId);
        }, 2000);
    }

    goBack() {
        this.utilsService.goBack();
    }

    ngOnDestroy() {
        if (this.readAlertTimeout) {
            clearTimeout(this.readAlertTimeout);
        }
        if (this.initNgAfterViewInit) {
            clearTimeout(this.initNgAfterViewInit);
        }
    }
}
