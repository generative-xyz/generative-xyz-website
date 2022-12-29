import { gsap } from 'gsap';
import { SectionInfo } from '../section-info';
import s from './artworks.module.scss';
import React, { useEffect, useRef } from 'react';
import { MaskerEnd } from '@animations/masker-end';
import { ScrollFixed } from '@animations/scroll-fixed';
import { isMobileAndTablet } from '@helpers/anim.helpers';

export const Artworks = (): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current || isMobileAndTablet()) return;

      const scrollFixed = new ScrollFixed(comp.current, window.innerHeight);
      scrollFixed.tl
        .fromTo(
          comp.current?.querySelector('.js-fame__big'),
          {
            width: '120vw',
            scale: 1.25,
          },
          { width: `${(1122 / 1920) * 100}%`, scale: 1 },
          0
        )
        .fromTo(
          comp.current?.querySelector('.js-fame__left'),
          { x: window.innerWidth / 2 },
          {
            x: `0%`,
          },
          0
        )
        .fromTo(
          comp.current?.querySelector('.js-fame__right'),
          { x: -window.innerWidth / 2 },
          {
            x: `0%`,
          },
          0
        );
    }, [comp]);

    return () => {
      anim.revert();
    };
  }, []);

  return (
    <MaskerEnd className={s.artWork}>
      <SectionInfo
        subTitle={`artworks in real time`}
        title={`Turn static code into kinetic art`}
        className={s.artWork_info}
      >
        {`Generative Display is a groundbreaking new frame that renders generative artworks and allows collectors to interact with their art. It accomplishes this by using powerful internal components and code to develop unique artworks in real time.`}
      </SectionInfo>
      <div ref={comp} className={s.artWork_show}>
        <div className={s.artWork_show_inner}>
          <div
            className={`${s.artWork_fame} ${s.artWork_fame__small} ${s.artWork_fame__left} js-fame__left`}
          >
            <video muted autoPlay preload={'auto'} playsInline loop>
              <source
                src="https://storage.googleapis.com/generative-static-prod/pages/home/Block2_Left-1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div
            className={`${s.artWork_fame} ${s.artWork_fame__big} js-fame__big`}
          >
            <video muted autoPlay preload={'auto'} playsInline loop>
              <source
                src="https://storage.googleapis.com/generative-static-prod/pages/home/Block2_Mid-1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div
            className={`${s.artWork_fame} ${s.artWork_fame__small} ${s.artWork_fame__right} js-fame__right`}
          >
            <video muted autoPlay preload={'auto'} playsInline loop>
              <source
                src="https://storage.googleapis.com/generative-static-prod/pages/home/Block2_Right-1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </MaskerEnd>
  );
};
