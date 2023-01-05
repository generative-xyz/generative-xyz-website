import s from './Landingpage.module.scss';
import { GridDebug } from '@components/Grid/grid';
import { CreatePageSection } from '@containers/Landingpage/components/CreatePage';
import { HardwareDisplaySection } from '@containers/Landingpage/components/HardwareDisplay';
import { MarketplaceSection } from '@containers/Landingpage/components/Marketplace';

export const Landingpage = (): JSX.Element => {
  return (
    <div className={s.landingpage}>
      <CreatePageSection />
      <HardwareDisplaySection />
      <MarketplaceSection />
      <GridDebug />
    </div>
  );
};
