import { createReducer } from '@reduxjs/toolkit';
import {
  setAnimationRegister,
  setDisabledMenu,
  setIsOpenCheckoutPopup,
  setIsOpenWalletSetting,
  setPageLoadStatus,
  setCheckoutProductId,
} from './action';
import { PAGE_LOADING } from '@constants/common';

const initialState = {
  isOpenWalletSetting: false,
  isOpenCheckoutPopup: false,
  checkoutProductId: '',
  animationRegister: 0,
  pageLoadStatus: PAGE_LOADING,
  disabledMenu: false,
};

const general = createReducer(initialState, builder => {
  builder
    .addCase(setIsOpenWalletSetting, (state, action) => {
      state.isOpenWalletSetting = action.payload;
    })
    .addCase(setIsOpenCheckoutPopup, (state, action) => {
      state.isOpenCheckoutPopup = action.payload;
    })
    .addCase(setCheckoutProductId, (state, action) => {
      state.checkoutProductId = action.payload;
    })
    .addCase(setAnimationRegister, (state, action) => {
      state.animationRegister = action.payload;
    })
    .addCase(setPageLoadStatus, (state, action) => {
      state.pageLoadStatus = action.payload;
    })
    .addCase(setDisabledMenu, (state, action) => {
      state.disabledMenu = action.payload;
    });
});

export default general;
