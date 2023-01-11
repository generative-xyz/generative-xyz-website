import React, { PropsWithChildren, useMemo, useRef } from 'react';
import { Loading } from '@containers/Home/components/loading';

export interface ILoadingContext {
  registerLoading: () => void;
  unRegisterLoading: () => void;
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
    counter.current += 1;
    // console.log('___ ++', counter.current);
  };

  const unRegisterLoading = (): void => {
    counter.current -= 1;
    counter.current = Math.max(counter.current, 0);
    // console.log('___ ---', counter.current);
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
      <Loading />
      {children}
    </LoadingContext.Provider>
  );
};
