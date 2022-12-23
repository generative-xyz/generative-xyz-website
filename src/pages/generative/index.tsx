import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import GenerativeProjectList from '@containers/GenerativeProjectList';

const GenerativeProjectListPage: NextPage = () => {
  return (
    <DefaultLayout>
      <GenerativeProjectList />
    </DefaultLayout>
  );
};

export default GenerativeProjectListPage;
