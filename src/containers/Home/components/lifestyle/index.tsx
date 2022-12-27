import { Frames } from '@animations/frames';
import { SectionInfo } from '../section-info';
import s from './lifestyle.module.scss';
import classNames from 'classnames';
import { MaskerStart } from '@animations/masker-start';

export const LifeStyle = () => {
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
        >
          <div className={classNames(s.lifeStyle_fame, 'js-frames')} />
        </Frames>
        <div className={s.lifeStyle_endContent}>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1">
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
      </MaskerStart>
    </div>
  );
};
