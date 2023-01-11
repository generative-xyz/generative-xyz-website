import React, { ReactNode, useMemo, useRef } from 'react';
import { LoadingLanding } from '@components/LoadingLanding';
import { SimpleLoading } from '@components/SimpleLoading';

export interface ILoadingContext {
  registerLoading: (n?: string) => void;
  unRegisterLoading: (n?: string) => void;
  getCounter: () => number;
}

const initialValue: ILoadingContext = {
  registerLoading: () => null,
  unRegisterLoading: () => null,
  getCounter: () => 0,
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

  const contextValues = useMemo((): ILoadingContext => {
    return {
      getCounter,
      registerLoading,
      unRegisterLoading,
    };
  }, [counter.current, getCounter, registerLoading, unRegisterLoading]);

  return (
    <LoadingContext.Provider value={contextValues}>
      {simple ? <SimpleLoading {...simple} /> : <LoadingLanding />}
      {children}
    </LoadingContext.Provider>
  );
};
