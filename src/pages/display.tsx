import { NextPage } from 'next';

import DisplayTemplate from '@containers/Display';
import MarketplaceLayout from '@layouts/Marketplace';

const DisplayPage: NextPage = () => {
  return (
    <MarketplaceLayout theme={'dark'}>
      <DisplayTemplate />
    </MarketplaceLayout>
  );
};

export default DisplayPage;
