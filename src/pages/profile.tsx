import { NextPage } from 'next';
import DefaultLayout from '@components/Layout/DefaultLayout';
import Profile from '@containers/Profile';

const ProfilePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Profile />
    </DefaultLayout>
  );
};

export default ProfilePage;
