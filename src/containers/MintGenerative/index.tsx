import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/MintGenerativeContexts';
import { useContext } from 'react';

import MintGenerativeStep1 from './Step1';
import styles from './styles.module.scss';

type StepProps = {
  item: {
    id: number;
    label: string;
  };
};
// const LOG_PREFIX = 'MintGenerative';

const MINT_STEPS = [
  {
    id: 1,
    label: 'Upload to IPFS',
  },
  {
    id: 2,
    label: 'Product detail',
  },
  {
    id: 3,
    label: 'Set price & mint',
  },
];

const MintGenerative = () => {
  const { currentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const StepItem = ({ item }: StepProps) => {
    return (
      <div className={currentStep === item.id ? styles.active : ''}>
        {item.id}. {item.label}
      </div>
    );
  };

  // const renderStepContent = () => {
  //   return <div className=""></div>;
  // };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {MINT_STEPS.map(step => (
          <StepItem item={step} key={`mint-step-${step.id}`} />
        ))}
      </div>
      <MintGenerativeStep1 />
    </div>
  );
};

export default MintGenerative;
