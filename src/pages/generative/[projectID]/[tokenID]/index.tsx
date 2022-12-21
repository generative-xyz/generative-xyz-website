import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import GenerativeTokenDetail from '@containers/GenerativeTokenDetail';

const GenerativeTokenDetailPage: NextPage = () => {
  return (
    <DefaultLayout>
      <GenerativeTokenDetail />
    </DefaultLayout>
  );
};

export default GenerativeTokenDetailPage;
