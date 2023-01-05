import React, {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import s from './styles.module.scss';
import cs from 'classnames';
import { useSelector } from 'react-redux';
import { pageLoadStatus } from '@redux/general/selector';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { debounce } from 'lodash';
import { PAGE_ENTER } from '@constants/common';
import { Anim } from '@animations/anim';
import {
  getDelay,
  getRandomArbitrary,
  getRandomArbitraryFloat,
} from '@helpers/anim.helpers';

type THeading = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light';
  style?: CSSProperties;
  className?: string;
  color?: string;
  animOption?: {
    screen: number;
    offset: number;
    type: 'heading' | 'random' | 'paragraph';
  };
};

interface IProRefDom {
  resizeObserver?: ResizeObserver;
  texts?: SplitType;
  text?: string;
  runned?: boolean;
  finalRunTexts?: string[];
  chars?: string[];
  arrText?: string[];
}

const Heading = ({
  as = 'h1',
  children,
  fontWeight = 'normal',
  style,
  color,
  className,
  animOption = undefined,
  ...props
}: PropsWithChildren<THeading>) => {
  const Text = as;

  const comp = useRef<HTMLHeadingElement>(null);
  const refDom = useRef<IProRefDom>({});
  const loadStatus = useSelector(pageLoadStatus);

  useEffect(() => {
    if (!animOption) return;
    const anim = gsap.context(() => {
      if (comp.current) {
        switch (animOption.type) {
          case 'heading':
            comp.current.classList.add(`is-handle`);
            refDom.current.texts = new SplitType(comp.current, {
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
            refDom.current.resizeObserver.observe(comp.current);
            break;

          case 'random':
            comp.current.classList.add(`is-handle`);
            refDom.current.text = comp.current.textContent || '';
            comp.current.textContent = '';
            refDom.current.arrText = refDom.current.text.split('');

            refDom.current.finalRunTexts = [];
            refDom.current.chars = '@#$%&qaertyuiopasdfghjklzxcvbnm'.split('');

            break;
        }
      }
    }, [comp]);

    return () => {
      anim.revert();
      switch (animOption.type) {
        case 'heading':
          comp.current?.classList.remove(`is-handle`);
          refDom.current?.texts && refDom.current.texts?.revert();
          refDom.current.resizeObserver?.unobserve(comp.current as HTMLElement);
          break;
        case 'random':
          if (comp.current)
            comp.current.textContent = refDom.current.text || null;
          break;
      }
    };
  }, []);

  useEffect(() => {
    if (!animOption) return;
    let anim: Anim | undefined;
    if (comp.current && loadStatus === PAGE_ENTER) {
      anim = new Anim(comp.current, () => {
        const delay = getDelay(animOption.screen, animOption.offset);
        switch (animOption.type) {
          case 'heading':
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
                  comp.current as HTMLElement
                );
              },
            });
            break;
          case 'random':
            if (comp.current) {
              comp.current.textContent = '';
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
            }
            break;
        }
      });
    }
    return () => {
      anim && anim.kill();
    };
  }, [loadStatus]);

  return (
    <Text
      {...props}
      ref={comp}
      className={cs(
        className,
        s.heading,
        `font-${fontWeight}`,
        `text-${color}`
      )}
      style={{ ...style }}
    >
      {children}
    </Text>
  );
};

export default Heading;
