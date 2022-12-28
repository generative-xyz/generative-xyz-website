import { RootState } from '..';

export const isOpenWalletSettingSelector = (state: RootState): boolean =>
  Boolean(state.general.isOpenWalletSetting);

export const isOpenCheckoutPopupSelector = (state: RootState): boolean =>
  state.general.isOpenCheckoutPopup;

export const checkoutProductId = (state: RootState): string =>
  state.general.checkoutProductId;

export const animationRegister = (state: RootState): number =>
  state.general.animationRegister;

export const pageLoadStatus = (state: RootState): string =>
  state.general.pageLoadStatus;

export const disabledMenuSelector = (state: RootState): boolean =>
  state.general.disabledMenu;
