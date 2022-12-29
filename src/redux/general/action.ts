import { createAction } from '@reduxjs/toolkit';

export const setIsOpenWalletSetting = createAction<boolean>(
  'general/setIsOpenWalletSetting'
);

export const setIsOpenCheckoutPopup = createAction<boolean>(
  'general/setIsOpenCheckoutPopup'
);

export const setCheckoutProduct = createAction<IFrame>(
  'general/setCheckoutProduct'
);

export const setAnimationRegister = createAction<number>(
  'general/setAnimationRegister'
);

export const setPageLoadStatus = createAction<string>(
  'general/setPageLoadStatus'
);

export const setDisabledMenu = createAction<boolean>('general/setDisabledMenu');
