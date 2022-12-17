import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep3 from '@containers/MintGenerative/Step3';
import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerativeContextProvider>
        <MintGenerative pageRender={<MintGenerativeStep3 />} />
      </MintGenerativeContextProvider>
    </DefaultLayout>
  );
};

export default MintGenerativePage;
