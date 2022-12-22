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
