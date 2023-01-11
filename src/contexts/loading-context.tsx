import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingLanding } from '@components/LoadingLanding';
import { SimpleLoading } from '@components/SimpleLoading';
import { useRouter } from 'next/router';
import { PAGE_LOADING } from '@constants/common';
import { ScrollTriggerHelper } from '@containers/Display/scrolltrigger-helper';

export interface ILoadingContext {
  registerLoading: (n?: string) => void;
  unRegisterLoading: (n?: string) => void;
  getCounter: () => number;
  setPageLoadStatus: (r: 'PAGE_LOADING' | 'PAGE_LOADED' | 'PAGE_ENTER') => void;
  pageLoadStatus: 'PAGE_LOADING' | 'PAGE_LOADED' | 'PAGE_ENTER';
}

const initialValue: ILoadingContext = {
  registerLoading: () => null,
  unRegisterLoading: () => null,
  getCounter: () => 0,
  pageLoadStatus: PAGE_LOADING,
  setPageLoadStatus: () => null,
};

interface IProp {
  children: ReactNode;
  simple?: {
    theme: 'light' | 'dark';
    isCssLoading: boolean;
  };
}

export const LoadingContext =
  React.createContext<ILoadingContext>(initialValue);
export const LoadingProvider: React.FC<IProp> = ({
  children,
  simple,
}: IProp): React.ReactElement => {
  const counter = useRef<number>(0);
  const [pageLoadStatus, setPageLoadStatus] = useState<
    'PAGE_LOADING' | 'PAGE_LOADED' | 'PAGE_ENTER'
  >('PAGE_LOADING');
  const { pathname } = useRouter();

  // console.log('___init', 'LoadingContext');

  const registerLoading = (): void => {
    if (typeof window !== undefined) {
      counter.current += 1;
      // console.log('___+', n);
    }
  };

  const unRegisterLoading = (): void => {
    counter.current -= 1;
    counter.current = Math.max(counter.current, 0);
    // console.log('___-', n);
  };

  const getCounter = (): number => {
    return counter.current;
  };

  useEffect(() => {
    setPageLoadStatus(PAGE_LOADING);
  }, [pathname]);

  useEffect(() => {
    const scrollhelper = new ScrollTriggerHelper();
    return () => {
      scrollhelper && scrollhelper.kill();
    };
  }, []);

  const contextValues = useMemo((): ILoadingContext => {
    return {
      getCounter,
      registerLoading,
      unRegisterLoading,
      pageLoadStatus,
      setPageLoadStatus,
    };
  }, [
    counter.current,
    getCounter,
    registerLoading,
    unRegisterLoading,
    pageLoadStatus,
    setPageLoadStatus,
  ]);

  return (
    <LoadingContext.Provider value={contextValues}>
      {simple ? <SimpleLoading {...simple} /> : <LoadingLanding />}
      {children}
    </LoadingContext.Provider>
  );
};
