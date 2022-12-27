import s from './styles.module.scss';
import React from 'react';
import { useRouter } from 'next/router';
import { MINT_STEPS } from '@constants/mint-generative';
import { IMintStep } from '@interfaces/mint-generative';
import cs from 'classnames';

const StepHeader: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { stepParam } = router.query;

  return (
    <div className={s.stepHeader}>
      <ul className={s.stepList}>
        {MINT_STEPS.map((step: IMintStep) => (
          <li
            className={cs(s.stepItem, {
              [`${s.stepItem__active}`]: stepParam === step.path,
            })}
            key={step.stepIndex}
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
