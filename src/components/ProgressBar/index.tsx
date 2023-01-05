import React, { useMemo } from 'react';
import s from './styles.module.scss';
import Heading from '@components/Heading';
import Text from '@components/Text';
import cs from 'classnames';
import Skeleton from '@components/Skeleton';

type TProgressBar = {
  current?: number;
  total?: number;
  size?: 'regular' | 'small';
  className?: string;
};

const ProgressBar = ({
  current,
  total,
  size = 'regular',
  className,
}: TProgressBar) => {
  const calcMintProgress = useMemo(() => {
    if (!current || !total) return 0;
    return (current / total) * 100;
  }, [total, current]);

  return (
    <div className={cs(s.wrapper, className)}>
      <div className={s.stats}>
        {size === 'regular' && (
          <>
            <Heading as="h5" fontWeight="bold">
              {total ? (
                `${current}/${total}`
              ) : (
                <Skeleton width={60} height={34} />
              )}
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
