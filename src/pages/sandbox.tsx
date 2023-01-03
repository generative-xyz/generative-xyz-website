import { NextPage } from 'next';
import Sandbox from '@containers/Sandbox';
import MarketplaceLayout from '@layouts/Marketplace';

const SandboxPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <Sandbox />
    </MarketplaceLayout>
  );
};

export default SandboxPage;
