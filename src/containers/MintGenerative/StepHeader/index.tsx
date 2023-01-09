import s from './styles.module.scss';
import React, { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { MINT_STEPS } from '@constants/mint-generative';
import { IMintStep } from '@interfaces/mint-generative';
import cs from 'classnames';
import { MintGenerativeContext } from '@contexts/mint-generative-context';

const StepHeader: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { stepParam } = router.query;
  const { currentStep } = useContext(MintGenerativeContext);

  const handleNavigate = useCallback(
    (step: IMintStep): void => {
      if (currentStep <= step.stepIndex) {
        return;
      }
      router.push(`/mint-generative/${step.path}`, undefined, {
        shallow: false,
      });
    },
    [currentStep]
  );

  return (
    <div className={s.stepHeader}>
      <ul className={s.stepList}>
        {MINT_STEPS.map((step: IMintStep) => (
          <li
            className={cs(s.stepItem, {
              [`${s.stepItem__active}`]: stepParam === step.path,
              [`${s.stepItem__disabled}`]: currentStep < step.stepIndex,
            })}
            key={step.stepIndex}
            onClick={() => handleNavigate(step)}
          >
            <div className={s.stepIndexWrapper}>
              <span className={s.stepIndex}>{step.stepIndex}</span>
            </div>
            <div className={s.stepTitleWrapper}>
              <span className={s.stepActiveDot} />
              <span className={s.stepTitle}>{step.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepHeader;
