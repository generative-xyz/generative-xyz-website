import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import s from './parallax.module.scss';
import { getScrollTop } from '@helpers/common';

interface IProps {
  children: ReactNode;
  className: string;
}

interface IProRefDom {
  offset: number;
}

export const AnimParallax = ({
  children,
  className = '',
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<IProRefDom>({ offset: 0.25 });

  const onScrolling = () => {
    const rect: DOMRect | undefined = comp.current?.getBoundingClientRect();
    if (rect && comp.current) {
      const disTop =
        (getScrollTop() - (rect.height - window.innerHeight) / 2) *
        refDom.current.offset;
      comp.current.style.transform = `translate3d(0, ${disTop}px, 0)`;
    }
  };

  useEffect(() => {
    const parallax = gsap.context(() => {
      if (comp.current) {
        refDom.current.offset =
          Number(comp.current.getAttribute('data-offset')) || 0.25;
        comp.current?.parentElement?.classList.add(
          `${s['anim-parallax_parent']}`
        );
        comp.current.classList.add(`${s['anim-parallax']}`, `is-handle`);
      }

      window.addEventListener('scroll', onScrolling);
    }, [comp]);

    return () => {
      comp.current?.parentElement?.classList.remove(
        `${s['anim-parallax_parent']}`
      );
      comp.current?.classList.remove(`${s['anim-parallax']}`, `is-handle`);
      window.removeEventListener('scroll', onScrolling);
      parallax.revert();
    };
  }, []);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
