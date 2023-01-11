import React, { PropsWithChildren, useMemo, useRef } from 'react';
import { LoadingLanding } from '@components/LoadingLanding';

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

export const LoadingContext =
  React.createContext<ILoadingContext>(initialValue);
export const LoadingProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
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
      <LoadingLanding />
      {children}
    </LoadingContext.Provider>
  );
};
