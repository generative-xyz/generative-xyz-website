import { createElement, ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { PAGE_ENTER } from '@constants/common';
import { useSelector } from 'react-redux';
import { pageLoadStatus } from '@redux/general/selector';
import { Anim } from '../anim';
import {
  getDelay,
  getRandomArbitrary,
  getRandomArbitraryFloat,
} from '@helpers/anim.helpers';

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
  const loadStatus = useSelector(pageLoadStatus);

  useEffect(() => {
    const anim = gsap.context(() => {
      refDom.current.target = comp.current || null;
      if (refDom.current.target) {
        refDom.current.target.classList.add(`is-handle`);
        refDom.current.text = refDom.current.target.textContent || '';
        refDom.current.target.textContent = '';
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
      (refDom.current.target && loadStatus === PAGE_ENTER && !isIn) ||
      (refDom.current.target && isIn)
    ) {
      refDom.current.target.textContent = '';
      new Anim(refDom.current.target, () => {
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

                if (refDom.current.target) {
                  refDom.current.target.textContent =
                    refDom.current.finalRunTexts.toString().replaceAll(',', '');
                }
              }
            },
            onComplete: () => {
              if (refDom.current.finalRunTexts && refDom.current.target) {
                refDom.current.finalRunTexts[key] = el;
                refDom.current.target.textContent = refDom.current.finalRunTexts
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
      if (refDom.current.target)
        refDom.current.target.textContent = refDom.current.text || null;
    };
  }, [loadStatus, isIn]);

  return createElement(tag, { className, ref: comp }, children);
};
