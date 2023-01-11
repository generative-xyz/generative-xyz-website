import { LOGO_GENERATIVE, PAGE_ENTER, PAGE_LOADED } from '@constants/common';
import { gsap } from 'gsap';
import s from './loading.module.scss';
import { useContext, useEffect, useRef } from 'react';
import { useAppDispatch } from '@redux';
import { setPageLoadStatus } from '@redux/general/action';
import { LoadingContext } from '@contexts/loading-context';
import Image from 'next/image';

interface IProcessing {
  value: number;
  delta: number;
  onHold: number;
  persen: number;
  loaded: boolean;
}

export const LoadingLanding = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { getCounter } = useContext(LoadingContext);
  const refLoading = useRef<HTMLDivElement>(null);
  const refPersent = useRef<HTMLSpanElement>(null);
  const processing = useRef<IProcessing>({
    value: 0,
    delta: 1,
    onHold: 0,
    persen: 0,
    loaded: false,
  });

  const loadingComplete = () => {
    dispatch(setPageLoadStatus(PAGE_LOADED));
    gsap.to(refLoading.current, {
      clipPath: 'inset(0 0 100% 0)',
      ease: 'power3.inOut',
      duration: 1,
      onComplete: () => {
        if (refLoading.current) {
          refLoading.current.style.display = 'none';
        }
        document.body.classList.remove('is-loading');
      },
    });

    setTimeout(() => dispatch(setPageLoadStatus(PAGE_ENTER)), 500);
  };

  const looper = () => {
    if (!processing.current || !refPersent.current) return;

    processing.current.persen +=
      processing.current.delta + processing.current.onHold;
    processing.current.persen = Math.min(processing.current.persen, 100);

    refPersent.current.textContent = `${Math.floor(
      processing.current.persen
    )}%`;

    if (processing.current.persen >= 100) {
      gsap.ticker.remove(looper);
      loadingComplete();
    }

    if (getCounter() !== 0) {
      processing.current.delta *= 0.9;
      processing.current.onHold += 0.0005;
      if (processing.current.onHold >= 1) {
        processing.current.onHold = 0;
      }
    } else {
      processing.current.delta = 2;
      processing.current.onHold = 0;
    }
  };

  useEffect(() => {
    document.body.classList.add('is-loading', 'hide-scroller');
    const loadContent = gsap.context(() => {
      gsap.ticker.add(looper);
    }, refLoading);

    return () => {
      document.body.classList.remove('is-loading');
      gsap.ticker.remove(looper);
      loadContent.revert();
    };
  }, []);

  return (
    <div ref={refLoading} className={s.loading}>
      <div className={s.loading_inner}>
        <Image width={64} height={64} src={LOGO_GENERATIVE} alt={'logo-url'} />
        <h5 className={s.loading_text}>The Benchmark for Generative Art</h5>
        <span ref={refPersent}>0%</span>
      </div>
    </div>
  );
};
