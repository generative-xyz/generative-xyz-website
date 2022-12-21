import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import GenerativeProjectDetail from '@containers/GenerativeProjectDetail';

const GenerativeProjectDetailPage: NextPage = () => {
  return (
    <DefaultLayout>
      <GenerativeProjectDetail />
    </DefaultLayout>
  );
};

export default GenerativeProjectDetailPage;
