export interface PostPortalDetails {
  id: number;
  postType: PostType;
  title: string;
  title_image: TitleImage;
  subtitle: string;
  body_image: BodyImage;
  body: string;
  created_by: number;
  postStatus: PostStatus;
  attachments: any[];
  publishAt: number;
  publishBy: number;
  unpublishedAt?: any;
  unpublishedBy?: any;
  sendPush: boolean;
  createdAt: number;
  updatedAt: number;
  updatedBy: number;
  deletedAt?: any;
  deletedBy?: any;
  postCategory?: PostCategory
  views?: number
  likes?: number
  dislikes?: number
  multiMediaUrl?: string
  spotifyUrl?: string
  instagramUrl?: string
  postCategoryIds: number[];
}

export interface PostType {
  id: number;
  created: Date;
  updated: Date;
  description: string;
  enable: boolean;
}
export interface TitleImage {
  id: number;
  created: Date;
  updated: Date;
  url: string;
  active: boolean;
  content: string;
}
export interface PostStatus {
  id: number;
  created: Date;
  updated: Date;
  statusDescription: string;
  enabled: boolean;
}
export interface PostCategory {
  created: Date
  description: string
  enable: boolean
  id: number
  updated: Date
}
export interface BodyImage {
  id: number;
  created: Date;
  updated: Date;
  url: string;
  active: boolean;
  imageLink: string;
}
  
export interface IFilterPosts {
    size?: number;
    page?: number;
}