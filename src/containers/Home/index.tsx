import React, { useEffect } from 'react';

import s from './Home.module.scss';
import { SectionHero } from '@containers/Home/components/hero';
import { registerLoading, unRegisterLoading } from '@helpers/anim.helpers';
import { Loading } from '@containers/Home/components/loading';
import { Artworks } from '@containers/Home/components/artworks';
import { HardWare } from './components/hardware';
import { LifeStyle } from '@containers/Home/components/lifestyle';
import { Prices } from '@containers/Home/components/prices';
import { ScrollTriggerHelper } from '@containers/Home/scrolltrigger-helper';

const Home: React.FC = (): JSX.Element => {
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
    };
  }, []);

  return (
    <div className={`${s.Home} desc__body`}>
      <Loading />
      <SectionHero />
      <Artworks />
      <HardWare />
      <LifeStyle />
      <Prices />
    </div>
  );
};

export default Home;
