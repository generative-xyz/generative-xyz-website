import { NextPage } from 'next';

import MarketplaceLayout from '@layouts/Marketplace';
import { BenefitPage } from '@containers/Benefit';

const HomePage: NextPage = () => {
  return (
    <MarketplaceLayout theme={'dark'}>
      <BenefitPage />
    </MarketplaceLayout>
  );
};

export default HomePage;
