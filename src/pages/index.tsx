import { NextPage } from 'next';

import DisplayTemplate from '@containers/Display';
import MarketplaceLayout from '@layouts/Marketplace';

const HomePage: NextPage = () => {
  return (
    <MarketplaceLayout theme={'dark'}>
      <DisplayTemplate />
    </MarketplaceLayout>
  );
};

export default HomePage;
