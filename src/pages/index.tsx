import { NextPage } from 'next';

import MarketplaceLayout from '@layouts/Marketplace';
// import { Landingpage } from '@containers/Landingpage';
import Display from '@containers/Display';

const HomePage: NextPage = () => {
  return (
    <MarketplaceLayout isHideFaucet={true} theme={'dark'}>
      <Display />
    </MarketplaceLayout>
  );
};

export default HomePage;
