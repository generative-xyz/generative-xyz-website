import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PAGE_ENTER } from '@constants/common';
import { getDelay } from '@helpers/anim.helpers';
import { Anim } from '../anim';
import { LoadingContext } from '@contexts/loading-context';

interface IProps {
  children: ReactNode;
  offset?: number;
  screen?: number;
  className?: string;
  isIn?: boolean;
  threshold?: number;
}

export const AnimFade = ({
  children,
  offset = 0,
  screen = 0,
  className = '',
  threshold = 0,
  isIn = true,
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);
  const { pageLoadStatus } = useContext(LoadingContext);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;
      comp.current.classList.add(`is-handle`);
      gsap.set(comp.current, { opacity: '0', y: 20 });
    }, [comp]);

    return () => {
      anim.revert();
      if (comp.current) {
        comp.current.classList.remove(`is-handle`);
      }
    };
  }, []);

  useEffect(() => {
    if (comp.current && pageLoadStatus === PAGE_ENTER) {
      new Anim(
        comp.current,
        () => {
          const delay = getDelay(screen, offset);
          gsap.to(comp.current, {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.8,
            delay,
          });
        },
        threshold
      );
    }
  }, [pageLoadStatus, isIn]);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
