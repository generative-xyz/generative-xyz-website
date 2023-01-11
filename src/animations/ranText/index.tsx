import { createElement, ReactNode, useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PAGE_ENTER } from '@constants/common';
import { Anim } from '../anim';
import {
  getDelay,
  getRandomArbitrary,
  getRandomArbitraryFloat,
} from '@helpers/anim.helpers';
import { LoadingContext } from '@contexts/loading-context';

interface IProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
  children: ReactNode;
  offset?: number;
  screen?: number;
  className: string;
  isIn?: boolean;
}

interface IProRefDom {
  target?: HTMLElement | null;
  kill: boolean;
  text?: string;
  arrText?: string[];
  finalRunTexts?: string[];
  chars?: string[];
}

export const AnimRanText = ({
  tag = 'h5',
  children,
  offset = 0,
  screen = 0,
  className = '',
  isIn = true,
}: IProps): JSX.Element => {
  const comp = useRef<HTMLElement>(null);
  const refDom = useRef<IProRefDom>({ kill: false });
  const { pageLoadStatus } = useContext(LoadingContext);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (comp.current) {
        comp.current.classList.add(`is-handle`);
        refDom.current.text = comp.current.textContent || '';
        comp.current.textContent = '';
        refDom.current.arrText = refDom.current.text.split('');

        refDom.current.finalRunTexts = [];
        refDom.current.chars = '@#$%&qaertyuiopasdfghjklzxcvbnm'.split('');
      }
    }, [comp]);

    return () => {
      anim.revert();
    };
  }, []);

  useEffect(() => {
    if (
      (comp.current && pageLoadStatus === PAGE_ENTER && !isIn) ||
      (comp.current && isIn)
    ) {
      comp.current.textContent = '';
      new Anim(comp.current, () => {
        const delay = getDelay(screen, offset);
        refDom.current?.arrText?.forEach((el: string, key: number) => {
          if (
            el === ' ' &&
            refDom.current.finalRunTexts &&
            refDom.current.finalRunTexts[key]
          ) {
            refDom.current.finalRunTexts[key] = el;
            return;
          }
          const fal = { value: 0 };
          gsap.to(fal, {
            delay: delay + getRandomArbitraryFloat(0, 0.4),
            value: 100,
            ease: 'power3.out',
            duration: 0.6,
            onUpdate: () => {
              if (
                Math.floor(fal.value) % 2 === 0 &&
                refDom.current.finalRunTexts &&
                refDom.current.chars
              ) {
                refDom.current.finalRunTexts[key] =
                  refDom.current.chars[
                    getRandomArbitrary(0, refDom.current.chars.length - 1)
                  ];

                if (comp.current) {
                  comp.current.textContent = refDom.current.finalRunTexts
                    .toString()
                    .replaceAll(',', '');
                }
              }
            },
            onComplete: () => {
              if (refDom.current.finalRunTexts && comp.current) {
                refDom.current.finalRunTexts[key] = el;
                comp.current.textContent = refDom.current.finalRunTexts
                  .toString()
                  .replaceAll(',', '');
              }
            },
          });
        });
      });
    }

    return () => {
      refDom.current.kill = false;
      if (comp.current) comp.current.textContent = refDom.current.text || null;
    };
  }, [pageLoadStatus, isIn]);

  return createElement(tag, { className, ref: comp }, children);
};
