import { LogLevel } from '@enums/log-level';
import {
  ILinkWalletPayload,
  IUnlinkWalletPayload,
} from '@interfaces/api/profile';
import { User } from '@interfaces/user';
import { post } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'ProfileService';

const API_PATH = '/profile';

export const linkWallet = async (
  payload: ILinkWalletPayload
): Promise<User> => {
  try {
    const res = await post<ILinkWalletPayload, User>(
      `${API_PATH}/link-wallet`,
      payload
    );
    return res;
  } catch (err: unknown) {
    log('link wallet error', LogLevel.Error, LOG_PREFIX);
    throw Error('API error');
  }
};

export const unlinkWallet = async (
  payload: IUnlinkWalletPayload
): Promise<void> => {
  try {
    await post<ILinkWalletPayload, User>(`${API_PATH}/link-wallet`, payload);
  } catch (err: unknown) {
    log('unlink error', LogLevel.Error, LOG_PREFIX);
    throw Error('API error');
  }
};
