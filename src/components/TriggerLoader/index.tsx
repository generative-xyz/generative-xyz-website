import { useEffect } from 'react';
import s from './TriggerLoader.module.scss';
import { useRef } from 'react';
import { Loading } from '@components/Loading';

interface IProps {
  onEnter: () => void;
  isLoaded: boolean;
  len: number;
  total: number;
}

export const TriggerLoad = ({
  onEnter,
  len,
  total,
  isLoaded = true,
}: IProps): JSX.Element => {
  const refTrigger = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(targets => {
      if (targets[0].isIntersecting && isLoaded && len < total) {
        onEnter();
      }
    });
    if (len < total) {
      refTrigger.current && ob.observe(refTrigger.current);
    } else {
      refTrigger.current && ob.unobserve(refTrigger.current);
    }
    return () => {
      refTrigger.current && ob.unobserve(refTrigger.current);
    };
  }, [isLoaded, len, total]);

  if (len >= total || total === 0) return <></>;
  return (
    <div className={s.triggerLoad}>
      <div ref={refTrigger} />
      <Loading isLoaded={isLoaded} />
    </div>
  );
};
