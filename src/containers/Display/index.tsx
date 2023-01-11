import React, { useContext, useEffect } from 'react';

import s from './Display.module.scss';
import { SectionHero } from '@containers/Display/components/hero';
import { Artworks } from '@containers/Display/components/artworks';
import { HardWare } from './components/hardware';
import { LifeStyle } from '@containers/Display/components/lifestyle';
import { Prices } from '@containers/Display/components/prices';
import { ScrollTriggerHelper } from '@containers/Display/scrolltrigger-helper';
import { LoadingContext, LoadingProvider } from '@contexts/loading-context';
const Display: React.FC = (): JSX.Element => {
  const { registerLoading, unRegisterLoading } = useContext(LoadingContext);
  registerLoading('Display');
  useEffect(() => {
    new ScrollTriggerHelper();
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    unRegisterLoading('Display');
    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
      unRegisterLoading('Display');
    };
  }, []);

  return (
    <div className={`${s.Home} desc__body`}>
      <SectionHero />
      <Artworks />
      <HardWare />
      <LifeStyle />
      <Prices />
    </div>
  );
};
const WrapDisplay = (): JSX.Element => {
  return (
    <LoadingProvider>
      <Display />
    </LoadingProvider>
  );
};

export default WrapDisplay;
