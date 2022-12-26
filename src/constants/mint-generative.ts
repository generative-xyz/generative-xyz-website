import { MintGenerativeStep } from '@enums/mint-generative';
import { IMintStep } from '@interfaces/mint-generative';

export const MINT_STEPS: Array<IMintStep> = [
  {
    path: MintGenerativeStep.UPLOAD_PROJECT,
    stepIndex: 1,
    title: 'Upload Genart',
  },
  {
    path: MintGenerativeStep.PROJECT_DETAIL,
    stepIndex: 2,
    title: 'Project Detail',
  },
  {
    path: MintGenerativeStep.SET_PRICE,
    stepIndex: 3,
    title: 'Set price & mint',
  },
];
