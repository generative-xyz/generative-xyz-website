import { Frames } from '@animations/frames';
import { SectionInfo } from '../section-info';
import s from './lifestyle.module.scss';
import classNames from 'classnames';
import { MaskerStart } from '@animations/masker-start';
import { useRef } from 'react';
import { gsap } from 'gsap';

export const LifeStyle = () => {
  const refOptions = useRef({ isIn: false });
  const refContent = useRef(null);

  const processing = (frame: number) => {
    if (frame < 18) {
      if (refOptions.current.isIn) {
        refOptions.current.isIn = false;
        gsap.killTweensOf(refContent.current);
        gsap.to(refContent.current, {
          opacity: 0,
          ease: 'power3.out',
          duration: 0.6,
        });
      }
    } else {
      if (!refOptions.current.isIn) {
        refOptions.current.isIn = true;
        gsap.killTweensOf(refContent.current);
        gsap.fromTo(
          refContent.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'power3.out',
            duration: 0.6,
          }
        );
      }
    }
  };

  return (
    <div className={s.lifeStyle}>
      <SectionInfo
        color={'dark'}
        subTitle={'lifestyle'}
        variant={'left-right'}
        title={'Ever-changing Art on the Wall.'}
      >
        Delight in the splendid visuals of changing artwork in a state of
        relaxation. Savor every precious moment of the generative art.
      </SectionInfo>
      <div className={s.lifeStyle_inner}>
        <MaskerStart className={s.lifeStyle_canvas}>
          <Frames
            width={1920}
            height={1080}
            className={s.lifeStyle_canvas_main}
            urlFrame={
              'https://storage.googleapis.com/generative-static-prod/pages/home/block-4/block-4-%d.jpg'
            }
            webmFrame={
              'https://storage.googleapis.com/generative-static-prod/pages/home/block-4-webp/block-4-%d.png.webp'
            }
            totalFrames={124}
            onProcessing={processing}
          >
            <div className={classNames(s.lifeStyle_fame, 'js-frames')} />
            <div className={s.lifeStyle_endContent}>
              <div
                className={classNames(
                  'container',
                  s.lifeStyle_endContent_container
                )}
              >
                <div className="row">
                  <div ref={refContent} className="col-10 offset-1">
                    <span className="desc__label text__white">
                      connect app control
                    </span>
                    <h3 className={'heading heading__large text__white mb-0'}>
                      Ultimate app controls built in.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Frames>
        </MaskerStart>
      </div>
    </div>
  );
};
