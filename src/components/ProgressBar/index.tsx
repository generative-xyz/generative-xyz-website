import React, { useMemo } from 'react';
import s from './styles.module.scss';
import Heading from '@components/Heading';
import Text from '@components/Text';

type TProgressBar = {
  current?: number;
  total?: number;
  size?: 'regular' | 'small';
};

const ProgressBar = ({
  current = 25,
  total = 50,
  size = 'regular',
}: TProgressBar) => {
  const calcMintProgress = useMemo(() => {
    return (current / total) * 100;
  }, [total, current]);

  return (
    <div className={s.wrapper}>
      <div className={s.stats}>
        {size === 'regular' && (
          <>
            <Heading as="h4" fontWeight="bold">
              {current}/{total}
            </Heading>
            <Text fontWeight="semibold">minted</Text>
          </>
        )}
        {size === 'small' && (
          <>
            <Text size="18" fontWeight="bold" as="span">
              {current}/{total}
            </Text>
            <Text size="12" fontWeight="regular">
              minted
            </Text>
          </>
        )}
      </div>
      <div className={s.progressWrapper}>
        <div
          className={s.progressBar}
          style={{
            width: `${calcMintProgress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
