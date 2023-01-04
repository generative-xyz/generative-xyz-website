import React, { useEffect } from 'react';

import s from './Display.module.scss';
import { SectionHero } from '@containers/Display/components/hero';
import { registerLoading, unRegisterLoading } from '@helpers/anim.helpers';
import { Loading } from '@containers/Display/components/loading';
import { Artworks } from '@containers/Display/components/artworks';
import { HardWare } from './components/hardware';
import { LifeStyle } from '@containers/Display/components/lifestyle';
import { Prices } from '@containers/Display/components/prices';
import { ScrollTriggerHelper } from '@containers/Display/scrolltrigger-helper';

const Display: React.FC = (): JSX.Element => {
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

export default Display;
