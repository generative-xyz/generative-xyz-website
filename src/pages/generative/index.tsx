import { NextPage } from 'next';
import GenerativeProjectList from '@containers/GenerativeProjectList';
import MarketplaceLayout from '@layouts/Marketplace';

const GenerativeProjectListPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <GenerativeProjectList />
    </MarketplaceLayout>
  );
};

export default GenerativeProjectListPage;
