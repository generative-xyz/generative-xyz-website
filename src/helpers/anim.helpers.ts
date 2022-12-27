import store from '../redux/index';
import { setAnimationRegister } from '@redux/general/action';
import supportsWebP from 'supports-webp';

export const webpSupported = async () => {
  return await supportsWebP;
};

export const registerLoading = () => {
  let rCount = store.getState()?.general.animationRegister;
  rCount += 1;
  store.dispatch(setAnimationRegister(rCount));
};

export const unRegisterLoading = () => {
  let rCount = store.getState()?.general.animationRegister;
  rCount -= 1;
  store.dispatch(setAnimationRegister(rCount));
};

export const checkPageLoaded = () => {
  return store.getState()?.general.animationRegister === 0;
};

export const checkPageScrolled = () => {
  return window.pageYOffset || document.documentElement.scrollTop || 0 > 100;
};

export const getDelay = (screen: number, offset: number) => {
  if (checkPageScrolled()) {
    return offset;
  }
  return screen;
};

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomArbitraryFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
