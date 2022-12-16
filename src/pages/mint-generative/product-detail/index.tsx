import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep2 from '@containers/MintGenerative/Step2';
import { MintGenerativeContextProvider } from '@contexts/MintGenerativeContexts';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerativeContextProvider>
        <MintGenerative pageRender={<MintGenerativeStep2 />} />
      </MintGenerativeContextProvider>
    </DefaultLayout>
  );
};

export default MintGenerativePage;
