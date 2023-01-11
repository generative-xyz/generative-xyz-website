import { Loading } from '@components/Loading';
import { PAGE_ENTER, PAGE_LOADED } from '@constants/common';
import { animationRegister } from '@redux/general/selector';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import s from './loading.module.scss';
import { LoadingContext } from '@contexts/loading-context';

interface IProcessing {
  value: number;
  delta: number;
  onHold: number;
  persen: number;
  loaded: boolean;
}

interface IProp {
  theme?: 'dark' | 'light';
  isCssLoading?: boolean;
}

export const SimpleLoading = ({
  theme = 'light',
  isCssLoading = false,
}: IProp): JSX.Element => {
  const { getCounter, setPageLoadStatus } = useContext(LoadingContext);
  const refLoading = useRef<HTMLDivElement>(null);
  const loadingCounter = useSelector(animationRegister);
  const processing = useRef<IProcessing>({
    value: 0,
    delta: 1,
    onHold: 0,
    persen: 0,
    loaded: false,
  });

  const loadingComplete = () => {
    setPageLoadStatus(PAGE_LOADED);
    gsap.to(refLoading.current, {
      opacity: 0,
      ease: 'power3.inOut',
      duration: 0.3,
      onComplete: () => {
        if (refLoading.current) {
          refLoading.current.style.display = 'none';
        }
        document.body.classList.remove('is-loading');
      },
    });
    setTimeout(() => setPageLoadStatus(PAGE_ENTER), 100);
  };

  const looper = () => {
    if (!processing.current) return;

    processing.current.persen +=
      processing.current.delta + processing.current.onHold;
    processing.current.persen = Math.min(processing.current.persen, 100);
    if (processing.current.persen >= 100) {
      gsap.ticker.remove(looper);
      loadingComplete();
    }

    if (getCounter() > 0) {
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
      if (loadingCounter <= 0 && refLoading.current) {
        processing.current.loaded = true;
      }
    }, refLoading);

    return () => {
      document.body.classList.remove('is-loading');
      gsap.ticker.remove(looper);
      loadContent.revert();
    };
  }, [loadingCounter]);

  return (
    <div ref={refLoading} className={classNames(s.loading, s[theme])}>
      {isCssLoading && (
        <div className={s.loading_inner}>
          <Loading isLoaded={false} />
        </div>
      )}
    </div>
  );
};
