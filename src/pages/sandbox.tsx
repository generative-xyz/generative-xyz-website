import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import Sandbox from '@containers/Sandbox';
import ClientOnly from '@components/Utils/ClientOnly';

const SandboxPage: NextPage = () => {
  return (
    <DefaultLayout>
      <ClientOnly>
        <Sandbox />
      </ClientOnly>
    </DefaultLayout>
  );
};

export default SandboxPage;
