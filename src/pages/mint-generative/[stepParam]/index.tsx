import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerative />
    </DefaultLayout>
  );
};

export default MintGenerativePage;
