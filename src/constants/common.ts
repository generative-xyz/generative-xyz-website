import { CDN_URL } from './config';

export const MENUS: Array<{ title: string; url: string }> = [
  // {
  //   title: 'create',
  //   url: '#',
  // },
  // {
  //   title: 'algo',
  //   url: '#',
  // },
  // {
  //   title: 'hardware',
  //   url: '/hardware',
  // },
  // {
  //   title: 'app',
  //   url: '#',
  // },
];

export const LOGO_URL =
  'https://cdn.autonomous.ai/static/upload/images/common/upload/20221221/logo6cbc3e712f.svg';

export const LOGO_MARKETPLACE_URL = `${CDN_URL}/icons/logo-marketplace.svg`;

export const CLOUDFRONT_SERVER_NAME = `https://cdn.autonomous.ai/`;
export const DEFAULT_ART_THUMBNAIL = `${CDN_URL}/images/default-thumbnail.svg`;
export const PLACE_HOLDER_IMAGE = `${CLOUDFRONT_SERVER_NAME}static/upload/images/common/upload/20210519/2560x1600-dark-gray-solid-color-backgrounda218631f0e.jpeg`;
export const CONTACT_EMAIL = 'team@generative.xyz';
export const SOCIALS = {
  discord: 'https://discord.com/invite/eUrvfKKTxP',
  twitter: 'https://twitter.com/generative_xyz',
};

export const PAGE_LOADED = 'PAGE_LOADED';
export const PAGE_LOADING = 'PAGE_LOADING';
export const PAGE_ENTER = 'PAGE_ENTER';
