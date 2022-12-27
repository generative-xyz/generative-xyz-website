import React, { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PAGE_ENTER } from '@constants/common';
import { useSelector } from 'react-redux';
import { pageLoadStatus } from '@redux/general/selector';
import { getDelay } from '@helpers/anim.helpers';
import { Anim } from '../anim';

interface IProps {
  children: ReactNode;
  offset?: number;
  screen?: number;
  className?: string;
  isIn?: boolean;
}

interface IProRefDom {
  target: HTMLDivElement | null;
}

export const AnimFade = ({
  children,
  offset = 0,
  screen = 0,
  className = '',
  isIn = true,
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<IProRefDom>({ target: null });
  const loadStatus = useSelector(pageLoadStatus);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;

      refDom.current.target = comp.current;
      if (refDom.current.target) {
        refDom.current.target.classList.add(`is-handle`);
        gsap.set(refDom.current.target, { opacity: '0', y: 20 });
      }
    }, [comp]);

    return () => {
      anim.revert();
      if (refDom.current.target) {
        refDom.current.target?.classList.remove(`is-handle`);
      }
    };
  }, []);

  useEffect(() => {
    if (refDom.current.target && loadStatus === PAGE_ENTER) {
      new Anim(refDom.current.target, () => {
        const delay = getDelay(screen, offset);
        gsap.to(refDom.current.target, {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 0.8,
          delay,
        });
      });
    }
  }, [loadStatus, isIn]);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
