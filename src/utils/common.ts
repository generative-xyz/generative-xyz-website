import { APP_ENV } from '@constants/config';
import { ApplicationEnvironment } from '@enums/config';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const isProduction = (): boolean => {
  return APP_ENV === ApplicationEnvironment.PRODUCTION;
};
