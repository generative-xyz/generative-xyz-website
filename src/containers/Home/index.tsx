import React, { useContext, useEffect } from 'react';

import s from './Home.module.scss';
import { SectionHero } from '@containers/Home/components/hero';
import { Artworks } from '@containers/Home/components/artworks';
import { HardWare } from './components/hardware';
import { LifeStyle } from '@containers/Home/components/lifestyle';
import { Prices } from '@containers/Home/components/prices';
import { ScrollTriggerHelper } from '@containers/Home/scrolltrigger-helper';
import { LoadingContext, LoadingProvider } from '@contexts/loading-context';

const Home: React.FC = (): JSX.Element => {
  const { registerLoading, unRegisterLoading } = useContext(LoadingContext);

  registerLoading();
  useEffect(() => {
    new ScrollTriggerHelper();
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    unRegisterLoading();
    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
      unRegisterLoading();
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
const WrapHome = (): JSX.Element => {
  return (
    <LoadingProvider>
      <Home />
    </LoadingProvider>
  );
};

export default WrapHome;
