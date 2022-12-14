import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import Sandbox from '@containers/Sandbox';

const SandboxPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Sandbox />
    </DefaultLayout>
  );
};

export default SandboxPage;
