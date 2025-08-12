export interface IErrorMsg {
  msg: string;
  error?: any;
}

export interface IUploadFile {
  fileName: string;
  type?: string;
  file?: File;
  fileContent?: string;
}

export interface IUploadDocument {
  url: string;
  name: string;
}

export interface IUploadResponse {
  url: string;
}
