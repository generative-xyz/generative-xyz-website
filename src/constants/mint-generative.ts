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

export const THIRD_PARTY_SCRIPTS = [
  {
    label: 'p5js@1.5.0',
    value: 'p5js@1.5.0',
  },
  {
    label: 'threejs@r124',
    value: 'threejs@r124',
  },
  {
    label: 'tonejs@14.8.49',
    value: 'tonejs@14.8.49',
  },
  {
    label: 'c2.min.js@1.0.0',
    value: 'c2.min.js@1.0.0',
  },
  {
    label: 'chromajs@2.4.2',
    value: 'chromajs@2.4.2',
  },
  {
    label: 'p5.grain.js@0.6.1',
    value: 'p5.grain.js@0.6.1',
  },
];
