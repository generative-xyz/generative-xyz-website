import { useEffect, useRef, createElement, ReactNode } from 'react';
import { gsap } from 'gsap';

import { debounce } from 'lodash';
import SplitType from 'split-type';
import { pageLoadStatus } from '@redux/general/selector';
import { PAGE_ENTER } from '@constants/common';
import { useSelector } from 'react-redux';
import { getDelay } from '@helpers/anim.helpers';
import { Anim } from '../anim';

interface IProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div';
  children: ReactNode;
  offset?: number;
  screen?: number;
  className: string;
  isIn?: boolean;
}

interface IProRefDom {
  heading?: HTMLHeadingElement | null;
  resizeObserver?: ResizeObserver;
  texts?: SplitType;
  text?: string;
  runned?: boolean;
}

export const AnimHeading = ({
  tag,
  children,
  offset = 0,
  screen = 0,
  className = '',
  isIn = true,
}: IProps): JSX.Element => {
  const comp = useRef<HTMLHeadingElement>(null);
  const refDom = useRef<IProRefDom>({ heading: null });
  const loadStatus = useSelector(pageLoadStatus);

  useEffect(() => {
    const anim = gsap.context(() => {
      refDom.current.heading = comp.current || null;
      if (refDom.current.heading) {
        refDom.current.heading.classList.add(`is-handle`);
        refDom.current.texts = new SplitType(refDom.current.heading, {
          types: 'lines, chars',
        });

        refDom.current.resizeObserver = new ResizeObserver(
          debounce(() => {
            if (refDom.current.texts) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              refDom.current.texts?.split();
              gsap.killTweensOf(refDom.current.texts.chars);
              gsap.set(refDom.current.texts.chars, { opacity: '0' });
            }
          }, 100)
        );
        refDom.current.resizeObserver.observe(refDom.current.heading);
      }
    }, [comp]);

    return () => {
      anim.revert();
      refDom.current.heading?.classList.remove(`is-handle`);
      refDom.current?.texts && refDom.current.texts?.revert();
      refDom.current.resizeObserver?.unobserve(
        refDom.current?.heading as HTMLElement
      );
    };
  }, []);

  useEffect(() => {
    if (refDom.current.heading && loadStatus === PAGE_ENTER) {
      new Anim(refDom.current.heading, () => {
        const delay = getDelay(screen, offset);

        gsap.to(refDom.current.texts?.chars || [], {
          opacity: 1,
          ease: 'power3.inOut',
          duration: 0.8,
          delay,
          stagger: {
            amount: 0.6,
            from: 'random',
          },
          onComplete: () => {
            refDom.current.resizeObserver?.unobserve(
              refDom.current?.heading as HTMLElement
            );
            // refDom.current.texts?.revert();
          },
        });
      });
    }
  }, [loadStatus, isIn]);

  return createElement(tag, { className, ref: comp }, children);
};
