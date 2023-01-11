import { NextPage } from 'next';

import DisplayTemplate from '@containers/Display';
import MarketplaceLayout from '@layouts/Marketplace';

const DisplayPage: NextPage = () => {
  return (
    <MarketplaceLayout isHideFaucet={true} theme={'dark'}>
      <DisplayTemplate />
    </MarketplaceLayout>
  );
};

export default DisplayPage;
