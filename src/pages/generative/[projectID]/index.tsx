import GenerativeProjectDetail from '@containers/GenerativeProjectDetail';
import MarketplaceLayout from '@layouts/Marketplace';
import { NextPage } from 'next';

const GenerativeProjectDetailPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <GenerativeProjectDetail />
    </MarketplaceLayout>
  );
};

export default GenerativeProjectDetailPage;
