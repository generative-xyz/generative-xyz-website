import { LocalStorageKey } from '@enums/local-storage';

export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    return accessToken;
  }
  return null;
};
