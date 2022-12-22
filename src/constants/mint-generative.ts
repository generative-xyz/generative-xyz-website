import { MintGenerativeStep } from '@enums/mint-generative';

export const MINT_STEPS: Array<{
  id: MintGenerativeStep;
  label: string;
}> = [
  {
    id: MintGenerativeStep.UPLOAD_PROJECT,
    label: 'Upload to IPFS',
  },
  {
    id: MintGenerativeStep.PRODUCT_DETAIL,
    label: 'Product detail',
  },
  {
    id: MintGenerativeStep.SET_PRICE,
    label: 'Set price & mint',
  },
];
