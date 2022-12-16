import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep1 from '@containers/MintGenerative/Step1';
import { MintGenerativeContextProvider } from '@contexts/MintGenerativeContexts';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerativeContextProvider>
        <MintGenerative pageRender={<MintGenerativeStep1 />} />
      </MintGenerativeContextProvider>
    </DefaultLayout>
  );
};

export default MintGenerativePage;
