import DefaultLayout from '@components/Layout/DefaultLayout';
import MintGenerative from '@containers/MintGenerative';
import MintGenerativeStep1 from '@containers/MintGenerative/Step1';
import { NextPage } from 'next';

const MintGenerativePage: NextPage = () => {
  return (
    <DefaultLayout>
      <MintGenerative pageRender={<MintGenerativeStep1 />} />
    </DefaultLayout>
  );
};

export default MintGenerativePage;
