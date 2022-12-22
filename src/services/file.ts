import { LogLevel } from '@enums/log-level';
import { IUploadFilePayload, IUploadFileResponse } from '@interfaces/api/files';
import { postFile } from '@services/http-client';
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
    log('failed to get profile', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile');
  }
};
