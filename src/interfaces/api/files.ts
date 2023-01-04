export interface IUploadFilePayload {
  file: File;
}

export interface IUploadFileResponse {
  fileName: string;
  fileSize: 0;
  id: string;
  mimeType: string;
  uploadedBy: string;
  url: string;
}

export interface IMinifyFilePayload {
  files: Record<
    string,
    {
      content: string;
      mediaType: string;
    }
  >;
}

export interface IMinifyFileResponse {
  files: Record<
    string,
    {
      content: string;
      mediaType: string;
      deflate: string;
    }
  >;
}
