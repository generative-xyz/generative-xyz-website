import { NextPage } from 'next';

import MarketplaceLayout from '@layouts/Marketplace';
import Benefit from '@containers/Benefit';

const BenefitTemplate: NextPage = () => {
  return (
    <MarketplaceLayout theme={'dark'}>
      <Benefit />
    </MarketplaceLayout>
  );
};

export default BenefitTemplate;
