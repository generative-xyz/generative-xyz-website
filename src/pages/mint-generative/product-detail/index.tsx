import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep2 from '@containers/MintGenerative/Step2';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerative pageRender={<MintGenerativeStep2 />} />
    </DefaultLayout>
  );
};

export default MintGenerativePage;
