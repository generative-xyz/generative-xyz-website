import { NextPage } from 'next';
import Sandbox from '@containers/Sandbox';
import MarketplaceLayout from '@layouts/Marketplace';
import ClientOnly from '@components/Utils/ClientOnly';

const SandboxPage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <ClientOnly>
        <Sandbox />
      </ClientOnly>
    </MarketplaceLayout>
  );
};

export default SandboxPage;
