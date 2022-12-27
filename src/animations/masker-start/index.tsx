import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollMaskStart } from './scroll-mask-start';

interface IProp {
  className: string;
  children: ReactNode;
}

interface refDom {
  scrollMask?: ScrollMaskStart;
}

export const MaskerStart = ({ className = '', children }: IProp) => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<refDom>({});

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;
      refDom.current.scrollMask = new ScrollMaskStart(comp.current, () => {
        refDom.current.scrollMask?.tl?.fromTo(
          comp.current,
          { clipPath: `inset(0% 11%)` },
          { clipPath: `inset(0% 0%)` },
          0
        );

        refDom.current?.scrollMask?.tl2 &&
          refDom.current.scrollMask.tl2.fromTo(
            comp.current,
            { clipPath: `inset(0% 0%)` },
            { clipPath: `inset(0% 10%)` },
            0
          );
      });
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
