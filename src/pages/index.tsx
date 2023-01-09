import { NextPage } from 'next';

import MarketplaceLayout from '@layouts/Marketplace';
import { Landingpage } from '@containers/Landingpage';

const HomePage: NextPage = () => {
  return (
    <MarketplaceLayout theme={'dark'}>
      <Landingpage />
    </MarketplaceLayout>
  );
};

export default HomePage;
