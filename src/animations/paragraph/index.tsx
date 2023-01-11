import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { debounce } from 'lodash';
import SplitType from 'split-type';
import { PAGE_ENTER } from '@constants/common';
import { getDelay } from '@helpers/anim.helpers';
import { Anim } from '../anim';
import s from './paragraph.module.scss';
import { LoadingContext } from '@contexts/loading-context';

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
  const { pageLoadStatus } = useContext(LoadingContext);

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
        comp.current &&
          refDom.current.resizeObserver?.unobserve(comp.current as HTMLElement);
        if (refDom.current.texts)
          gsap.set(refDom.current.texts?.words, { y: '0' });
      }
      refDom.current.texts && refDom.current.texts?.revert();
    };
  }, []);

  useEffect(() => {
    if (comp.current && pageLoadStatus === PAGE_ENTER) {
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
                refDom.current.texts?.revert();
                comp.current?.classList.remove(`${s['anim-paragraph']}`);
                refDom.current.resizeObserver?.unobserve(
                  comp.current as HTMLElement
                );
              },
            });
            delay += 0.15;
          });
        }
      });
    }
  }, [pageLoadStatus]);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
