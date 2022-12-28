import { NextPage } from 'next';

import HomeTemplate from '@containers/Home';
import DefaultLayout from '@layouts/Default';

const HomePage: NextPage = () => {
  return (
    <DefaultLayout>
      <HomeTemplate />
    </DefaultLayout>
  );
};

export default HomePage;
