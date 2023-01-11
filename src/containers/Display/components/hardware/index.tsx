import s from './hardware.module.scss';
import { gsap } from 'gsap';
import { SectionInfo } from '@containers/Display/components/section-info';
import { Monitor } from '@containers/Display/components/hardware/monitor';
import classNames from 'classnames';
import { MaskerStart } from 'src/animations/masker-start';
import { Frames } from '@animations/frames';
import { HARDWARE_CONTENTS } from '@constants/frame';
import { useContext, useRef, useEffect } from 'react';
import { Benchmark } from './benchmark';
import { LoadingContext } from '@contexts/loading-context';
import { CDN_URL } from '@constants/config';

export const HardWare = (): JSX.Element => {
  const { registerLoading, unRegisterLoading } = useContext(LoadingContext);

  const refOptions = useRef({ isCPUIn: false, isFirst: false });
  const refMain = useRef<HTMLDivElement>(null);
  const refScreen = useRef(null);
  const refCpu = useRef(null);

  const processing = (frame: number) => {
    if (frame > 62) {
      if (!refOptions.current.isCPUIn) {
        refOptions.current.isCPUIn = true;
        refOptions.current.isFirst = false;
        refMain.current?.classList.add(`${s['is-white']}`);
        gsap.to(refScreen.current, {
          opacity: 0,
          y: -60,
          ease: 'power3.out',
          duration: 0.6,
        });
        gsap.fromTo(
          refCpu.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: 'power3.out', duration: 0.6 }
        );
      }
    } else if (frame > 20) {
      if (!refOptions.current.isFirst) {
        refOptions.current.isFirst = true;
        gsap.fromTo(
          refScreen.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, ease: 'power3.out', duration: 0.6 }
        );
      }

      if (refOptions.current.isCPUIn) {
        refOptions.current.isCPUIn = false;
        refMain.current?.classList.remove(`${s['is-white']}`);

        gsap.to(refCpu.current, {
          opacity: 0,
          y: -60,
          ease: 'power3.out',
          duration: 0.6,
        });
      }
    } else {
      if (refOptions.current.isFirst) {
        refOptions.current.isFirst = false;
        gsap.to(refScreen.current, {
          opacity: 0,
          y: -60,
          ease: 'power3.out',
          duration: 0.6,
        });
      }
    }
  };

  useEffect(() => {
    processing(0);
    return () => {
      refMain.current?.classList.remove(`${s['is-white']}`);
    };
  }, []);

  return (
    <div ref={refMain} className={s.hardWare}>
      <SectionInfo
        color={'dark'}
        className={s.hardWare_info}
        subTitle={'Hardware configuration'}
        title={'External beauty. Cutting-edge within.'}
      >
        Say hello to a frame that’s extreme in every way. Generative Display is
        designed for collectors who need the ultimate live rendering
        performance.
      </SectionInfo>
      <div className={s.hardWare_wrap}>
        <MaskerStart className={s.hardWare_content}>
          <div>
            <Frames
              width={1920}
              height={1080}
              className={s.hardWare_content_main}
              urlFrame={`${CDN_URL}/pages/home/frame-3/block-3-v2-%d.png`}
              webmFrame={`${CDN_URL}/pages/home/frame-3/block-3-v2-%d.png.webp`}
              totalFrames={111}
              onProcessing={processing}
              start={registerLoading}
              end={unRegisterLoading}
            >
              <div className={`${s.hardWare_content_detail}`}>
                <div className={s.hardWare_content_detail_inner}>
                  <div
                    ref={refScreen}
                    className={`${s.hardWare_content_detail_display}`}
                  >
                    <Monitor data={HARDWARE_CONTENTS[0]} />
                  </div>
                  <div
                    ref={refCpu}
                    className={`${s.hardWare_content_detail_cpu}`}
                  >
                    <Monitor data={HARDWARE_CONTENTS[1]} />
                  </div>
                </div>
              </div>
              <div
                className={classNames(s.hardWare_content_frames, 'js-frames')}
              />
            </Frames>
            <Benchmark />
          </div>
        </MaskerStart>
      </div>
    </div>
  );
};
