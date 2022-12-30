import { NextPage } from 'next';
import Marketplace from '@containers/Marketplace';
import MarketplaceLayout from '@layouts/Marketplace';

const MarketplacePage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <Marketplace />
    </MarketplaceLayout>
  );
};

export default MarketplacePage;
