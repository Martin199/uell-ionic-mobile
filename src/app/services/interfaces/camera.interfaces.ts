export interface ImageInterface {
  base64String: string;
  format: string;
  imageUrl: string;
  size: number;
}

export class ImageClass implements ImageInterface {
  base64String: string;
  format: string;
  imageUrl: string;
  size: number;

  constructor(image: ImageInterface) {
    this.base64String = image.base64String;
    this.format = image.format;
    this.imageUrl = image.imageUrl;
    this.size = image.size;
  }
}

//fileContent espera imagen en base64
export interface ImageUpload {
  fileName: string;
  fileContent?: string;
}
