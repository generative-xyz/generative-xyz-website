import ClientOnly from '@components/Utils/ClientOnly';
import { OfferTab } from '@containers/Profile/Components/Offer';
import { OwnedTab } from '@containers/Profile/Components/OwnedTab';
import { UserInfo } from '@containers/Profile/Components/UserInfo';
import { ProfileContext, ProfileProvider } from '@contexts/profile-context';
import React, { useContext } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import s from './Profile.module.scss';
import { Loading } from '@components/Loading';
import { CreatedTab } from '@containers/Profile/Components/Created';

// const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const { isLoaded, profileTokens, profileProjects, profileMakeOffer } =
    useContext(ProfileContext);

  return (
    <div className={s.profile}>
      <UserInfo />
      <Container>
        <ClientOnly>
          <Tabs className={s.tabs} defaultActiveKey="ownedTab">
            <Tab
              tabClassName={s.tab}
              eventKey="ownedTab"
              title={`Owned (${profileTokens?.total || 0})`}
            >
              <OwnedTab />
            </Tab>

            <Tab
              tabClassName={s.tab}
              eventKey="createdTab"
              title={`Created (${profileProjects?.total || 0})`}
            >
              <CreatedTab />
            </Tab>

            <Tab
              tabClassName={s.tab}
              eventKey="offerTab"
              title={`Offer (${profileMakeOffer?.total || 0})`}
            >
              <OfferTab />
            </Tab>
          </Tabs>
        </ClientOnly>
      </Container>
      <Loading
        className={s.profile_loading}
        isLoaded={isLoaded}
        isPage={true}
      />
    </div>
  );
};

const ProfileWrapper = () => {
  return (
    <ProfileProvider>
      <Profile />
    </ProfileProvider>
  );
};

export default ProfileWrapper;
