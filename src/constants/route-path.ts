import { isProduction } from '@utils/common';

export const ROUTE_PATH = {
  HOME: '/',
  MARKETPLACE: isProduction()
    ? 'https://testnet.generative.xyz/marketplace'
    : '/marketplace',
  CREATE_PROJECT: isProduction()
    ? 'https://testnet.generative.xyz/mint-generative/upload-project'
    : '/mint-generative/upload-project',
  BENEFIT: '/benefit',
  GENERATIVE: '/generative',
  PROFILE: '/profile',
  SANDBOX: '/sandbox',
  DISPLAY: '/display',
};
