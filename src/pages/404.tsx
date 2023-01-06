import { NextPage } from 'next';
import MarketplaceLayout from '@layouts/Marketplace';
import { Page404 } from '@containers/404';

const ErrorPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <Page404 />
    </MarketplaceLayout>
  );
};

export default ErrorPage;
