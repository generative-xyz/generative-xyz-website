import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollMaskEnd } from './scroll-mask-end';

interface IProp {
  className: string;
  children: ReactNode;
}

interface refDom {
  scrollMask?: ScrollMaskEnd;
}

export const MaskerEnd = ({ className = '', children }: IProp) => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<refDom>({});

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;

      refDom.current.scrollMask = new ScrollMaskEnd(
        comp.current,
        window.innerHeight
      );
      refDom.current.scrollMask.tl.fromTo(
        comp.current,
        { clipPath: `inset(0%)` },
        { clipPath: `inset(0 10%)` },
        0
      );
    }, [comp]);

    return () => {
      anim.revert();
      refDom.current.scrollMask?.kill();
    };
  }, []);

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
