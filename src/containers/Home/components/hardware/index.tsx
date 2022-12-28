import s from './hardware.module.scss';
import { gsap } from 'gsap';
import { SectionInfo } from '@containers/Home/components/section-info';
import { Monitor } from '@containers/Home/components/hardware/monitor';
import classNames from 'classnames';
import { MaskerStart } from 'src/animations/masker-start';
import { Frames } from '@animations/frames';
import { HARDWARE_CONTENTS } from '@constants/frame';
import { useRef, useEffect } from 'react';
// import { Benchmark } from '@containers/Home/components/benchmark';

export const HardWare = (): JSX.Element => {
  const refOptions = useRef({ isCPUIn: false, isFirst: false });
  const refMain = useRef<HTMLDivElement>(null);
  const refScreen = useRef(null);
  const refCpu = useRef(null);

  const processing = (frame: number) => {
    if (frame > 70) {
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
    } else if (frame > 30) {
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
          <Frames
            width={1920}
            height={1080}
            className={s.hardWare_content_main}
            urlFrame={
              'https://storage.googleapis.com/generative-static-prod/pages/home/block-3/block-3-%d.png'
            }
            webmFrame={`https://storage.googleapis.com/generative-static-prod/pages/home/block-3-webp/block-3-%d.png.webp`}
            totalFrames={111}
            onProcessing={processing}
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
          {/*<div className={s.hardWare_benchmark}>*/}
          {/*  <div className="row">*/}
          {/*    <div className="col-6 offset-3">*/}
          {/*      <Benchmark*/}
          {/*        className={s.hardWare_benchmark_item}*/}
          {/*        color={'yellow'}*/}
          {/*        title={'Multi-core CPU'}*/}
          {/*        target1={{ title: 'Generative Display', value: 3945 }}*/}
          {/*        target2={{ title: 'Apple M1 8 core', value: 2040 }}*/}
          {/*      />*/}
          {/*      <Benchmark*/}
          {/*        className={s.hardWare_benchmark_item}*/}
          {/*        title={'Multi-core CPU'}*/}
          {/*        color={'blue'}*/}
          {/*        target1={{ title: 'Generative Display', value: 502 }}*/}
          {/*        target2={{ title: 'Apple M1 8 core', value: 403 }}*/}
          {/*      />*/}
          {/*      <Benchmark*/}
          {/*        className={s.hardWare_benchmark_item}*/}
          {/*        title={'Multi-core CPU'}*/}
          {/*        color={'dep-blue'}*/}
          {/*        target1={{ title: 'Generative Display', value: 120183 }}*/}
          {/*        target2={{ title: 'Apple M1 8 core', value: 18171 }}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </MaskerStart>
      </div>
    </div>
  );
};
