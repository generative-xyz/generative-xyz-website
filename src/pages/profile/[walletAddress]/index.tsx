import Profile from '@containers/Profile';
import MarketplaceLayout from '@layouts/Marketplace';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {
  return (
    <MarketplaceLayout>
      <Profile />
    </MarketplaceLayout>
  );
};

export default ProfilePage;
