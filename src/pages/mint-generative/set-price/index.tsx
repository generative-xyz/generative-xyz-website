import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep3 from '@containers/MintGenerative/Step3';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerative pageRender={<MintGenerativeStep3 />} />
    </DefaultLayout>
  );
};

export default MintGenerativePage;
