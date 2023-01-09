import { useEffect } from 'react';
import s from './Landingpage.module.scss';
import { CreatePageSection } from '@containers/Landingpage/components/CreatePage';
import { HardwareDisplaySection } from '@containers/Landingpage/components/HardwareDisplay';
import { MarketplaceSection } from '@containers/Landingpage/components/Marketplace';
import { LoadingLanding } from '@components/LoadingLanding';

export const Landingpage = (): JSX.Element => {
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
    };
  }, []);

  return (
    <div className={s.landingpage}>
      <LoadingLanding />
      <CreatePageSection />
      <HardwareDisplaySection />
      <MarketplaceSection />
    </div>
  );
};
