import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { PropsWithChildren, useContext } from 'react';
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

const MintGenerative = ({ children }: PropsWithChildren) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {MINT_STEPS.map(step => (
          <StepItem item={step} key={`mint-step-${step.id}`} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default MintGenerative;
