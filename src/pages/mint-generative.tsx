import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import { MintGenerativeContextProvider } from '@contexts/MintGenerativeContexts';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerativeContextProvider>
        <MintGenerative />
      </MintGenerativeContextProvider>
    </DefaultLayout>
  );
};

export default MintGenerativePage;
