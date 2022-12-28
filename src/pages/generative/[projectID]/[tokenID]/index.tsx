import GenerativeTokenDetail from '@containers/GenerativeTokenDetail';
import MarketplaceLayout from '@layouts/Marketplace';
import { NextPage } from 'next';

const GenerativeTokenDetailPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <GenerativeTokenDetail />
    </MarketplaceLayout>
  );
};

export default GenerativeTokenDetailPage;
