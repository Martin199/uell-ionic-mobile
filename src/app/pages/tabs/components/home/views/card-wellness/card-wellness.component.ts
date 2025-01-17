import { Component, inject, Input, OnInit } from '@angular/core';
import { map, shareReplay, take } from 'rxjs';
import { PostDetails } from 'src/app/core/interfaces/wellness';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-wellness',
  templateUrl: './card-wellness.component.html',
  styleUrls: ['./card-wellness.component.scss'],
})
export class CardWellnessComponent implements OnInit  {

  @Input() tenantParameters : any;
  user: User= {} as User;
  post!: PostDetails;
  imgUrl!: string;
  firstResult: any;
  imgUrlComun?: string;

  postService = inject (PostService)
  userService = inject (UserService)
  storageService = inject (StorageService)
  
  constructor() { 
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters')
  }

  ngOnInit(): void {
    this.getlastWellnessPost();
    this.getlastWellnessPostTypeOne();
  }

  findTenant(moduleActive: string) {
    return this.tenantParameters.tenantParameters?.activeModules?.find((module: any) => module === moduleActive);
  }

  getlastWellnessPost() {
    this.postService
      .getLastPost()
      .pipe(
        map((post: any) => {
          post.body = post.body.replace(/<\/?p>/g, '');
          return post;
        }),
        shareReplay(1)
      )
      .subscribe((post) => {
        this.post = post;
        if (post && post?.title_image?.url) {
          this.userService.downloadFile(post.title_image.url).subscribe((url: string) => {
            this.imgUrl = url;
          });
        }
      });
  }

  getlastWellnessPostTypeOne() {
    this.postService
      .getPostTypeId()
      .pipe(take(1))
      .subscribe((data: any) => {
        const contentFilter = data.content
        this.firstResult = contentFilter;
        this.userService.downloadFile(this.firstResult?.title_image?.url).subscribe((url: string) => {
          this.imgUrlComun = url;
        });
      });
  }

  goTo(post: any) {
    // this.router.navigate(['newton/wellness-portal'], { replaceUrl: true });
    // this.trackingModules('wellness_blog');
  }

}
