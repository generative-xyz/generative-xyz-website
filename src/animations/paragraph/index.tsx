import React, { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { debounce } from 'lodash';
import SplitType from 'split-type';
import { pageLoadStatus } from '@redux/general/selector';
import { PAGE_ENTER } from '@constants/common';
import { useSelector } from 'react-redux';
import { getDelay } from '@helpers/anim.helpers';
import { Anim } from '../anim';
import s from './paragraph.module.scss';

interface IProps {
  children: ReactNode;
  offset?: number;
  screen?: number;
  className: string;
}

interface IProRefDom {
  texts?: SplitType;
  resizeObserver?: ResizeObserver;
}

export const AnimParagraph = ({
  children,
  offset = 0,
  screen = 0,
  className = '',
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<IProRefDom>({});
  const loadStatus = useSelector(pageLoadStatus);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (comp.current) {
        comp.current.classList.add(`${s['anim-paragraph']}`, `is-handle`);
        refDom.current.texts = new SplitType(comp.current, {
          types: 'lines, words',
        });
        refDom.current.resizeObserver = new ResizeObserver(
          debounce(() => {
            if (refDom.current.texts) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              refDom.current?.texts.split();
              gsap.killTweensOf(refDom.current.texts?.chars);
              gsap.set(refDom.current.texts?.words, { y: '100%' });
            }
          }, 100)
        );
        refDom.current.resizeObserver.observe(comp.current);
      }
    }, [comp]);

    return () => {
      anim.revert();
      if (comp.current) {
        comp.current.classList.remove(`is-handle`, `${s['anim-paragraph']}`);
        refDom.current.resizeObserver?.unobserve(comp.current as HTMLElement);
      }
      refDom.current.texts && refDom.current.texts?.revert();
    };
  }, []);

  useEffect(() => {
    if (comp.current && loadStatus === PAGE_ENTER) {
      new Anim(comp.current, () => {
        let delay = getDelay(screen, offset);

        if (refDom.current.texts && refDom.current.texts.lines) {
          refDom.current.texts.lines.forEach(el => {
            gsap.to(el.children, {
              y: '0%',
              ease: 'power3.inOut',
              duration: 0.8,
              delay,
              onComplete: () => {
                comp.current?.classList.remove(`${s['anim-paragraph']}`);
              },
            });
            delay += 0.15;
          });
        }
      });
    }
  }, [loadStatus]);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
