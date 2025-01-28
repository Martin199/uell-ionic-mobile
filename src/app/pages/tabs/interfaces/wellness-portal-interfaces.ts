export interface IWellnessPortalPost {
  id: number
  postType: PostType
  title: string
  title_image: TitleImage
  subtitle: string
  body_image: BodyImage
  body: string
  created_by: number
  postStatus: PostStatus
  attachments: any[]
  publishAt: number
  publishBy: number
  unpublishedAt: any
  unpublishedBy: any
  sendPush: boolean
  createdAt: number
  updatedAt: number
  updatedBy: number
  deletedAt: any
  deletedBy: any
  tenant: string
  postCategoryIds: any[]
  isHighlight: boolean
  likes: number
  dislikes: number
  views: number
  spotifyUrl: any
  instagramUrl: any
  multiMediaUrl: any
}

export interface PostType {
  id: number
  created: string
  updated: string
  description: string
  enable: boolean
}

export interface TitleImage {
  id: number
  created: string
  updated: string
  url: string
  active: boolean
}

export interface BodyImage {
  id: number
  created: string
  updated: string
  url: string
  active: boolean
  imageLink: string
}

export interface PostStatus {
  id: number
  created: string
  updated: string
  statusDescription: string
  enabled: boolean
}


export interface ICarouselWellnessPortal {
  id: number,
  title: string,
  subtitle?: string,
  img?: string,
  multimedia?: string;
  publishAt?: any;
}