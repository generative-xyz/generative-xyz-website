import { gsap } from 'gsap';
import { SectionInfo } from '../section-info';
import s from './artworks.module.scss';
import { useEffect, useRef } from 'react';
import { MaskerEnd } from '@animations/masker-end';
import { ScrollFixed } from '@animations/scroll-fixed';

export const Artworks = (): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = gsap.context(() => {
      if (!comp.current) return;

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
            <video
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221223/video-left47eb720df6.mp4"
              muted
              autoPlay
              preload={'auto'}
              playsInline
              loop
            />
          </div>
          <div
            className={`${s.artWork_fame} ${s.artWork_fame__big} js-fame__big`}
          >
            <video
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221223/centeraba6f7f7ff.mp4"
              muted
              autoPlay
              preload={'auto'}
              playsInline
              loop
            />
          </div>
          <div
            className={`${s.artWork_fame} ${s.artWork_fame__small} ${s.artWork_fame__right} js-fame__right`}
          >
            <video
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221223/video-rightc8ecf13cd4.mp4"
              muted
              autoPlay
              preload={'auto'}
              playsInline
              loop
            />
          </div>
        </div>
      </div>
    </MaskerEnd>
  );
};
