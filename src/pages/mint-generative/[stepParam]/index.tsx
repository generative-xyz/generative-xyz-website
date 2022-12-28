import { NextPage } from 'next';
import MintGenerative from '@containers/MintGenerative';
import MarketplaceLayout from '@layouts/Marketplace';

const MintGenerativePage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <MintGenerative />
    </MarketplaceLayout>
  );
};

export default MintGenerativePage;
