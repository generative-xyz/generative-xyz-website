import { storageUtil, LOCALSTORAGE_CONFIG } from '@helpers/storage';

interface IGetTokensFromLocalStorageReturnType {
  accessToken: string | null;
  refreshToken: string | null;
  address: string | null;
}

export const setTokensFromLocalStorage = ({
  accessToken,
  refreshToken,
  address,
}: IGetTokensFromLocalStorageReturnType): void => {
  storageUtil.set(
    LOCALSTORAGE_CONFIG.accessTokenStorageKey,
    String(accessToken)
  );
  storageUtil.set(
    LOCALSTORAGE_CONFIG.refreshTokenStorageKey,
    String(refreshToken)
  );
  storageUtil.set(LOCALSTORAGE_CONFIG.address, String(address));
};

export const getTokensFromLocalStorage =
  (): IGetTokensFromLocalStorageReturnType => {
    return {
      accessToken: storageUtil.get(LOCALSTORAGE_CONFIG.accessTokenStorageKey),
      refreshToken: storageUtil.get(LOCALSTORAGE_CONFIG.refreshTokenStorageKey),
      address: storageUtil.get(LOCALSTORAGE_CONFIG.address),
    };
  };

export const getLogInEmailFromLocalStorage = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_CONFIG.userEmail);
};

export const getLogInUserIdFromLocalStorage = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_CONFIG.user);
};

export const removeAuthLocalStorage = (): void => {
  storageUtil.remove(LOCALSTORAGE_CONFIG.accessTokenStorageKey);
  storageUtil.remove(LOCALSTORAGE_CONFIG.refreshTokenStorageKey);
  storageUtil.remove(LOCALSTORAGE_CONFIG.address);
};
