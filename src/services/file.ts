import { LogLevel } from '@enums/log-level';
import {
  IMinifyFilePayload,
  IMinifyFileResponse,
  IUploadFilePayload,
  IUploadFileResponse,
} from '@interfaces/api/files';
import { post, postFile } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'FilesService';

const API_PATH = '/files';

export const uploadFile = async (
  payload: IUploadFilePayload
): Promise<IUploadFileResponse> => {
  try {
    const res = await postFile<IUploadFilePayload, IUploadFileResponse>(
      `${API_PATH}`,
      payload
    );
    return res;
  } catch (err: unknown) {
    log('failed to upload file', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to upload file');
  }
};

export const minifyFile = async (
  payload: IMinifyFilePayload
): Promise<IMinifyFileResponse> => {
  try {
    const res = await post<IMinifyFilePayload, IMinifyFileResponse>(
      `${API_PATH}/minify`,
      payload
    );
    return res;
  } catch (err: unknown) {
    log('failed to minify file', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to minify file');
  }
};
