import s from './Profile.module.scss';
import React, { useContext } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import ClientOnly from '@components/Utils/ClientOnly';
import { OwnedTab } from '@containers/Profile/Components/OwnedTab';
import { UserInfo } from '@containers/Profile/Components/UserInfo';
import { OfferTab } from '@containers/Profile/Components/Offer';
import { ListingTab } from '@containers/Profile/Components/Listing';
import { ProfileContext, ProfileProvider } from '@contexts/profile-context';

// const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const { profileTokens, profileProjects, profileListing, profileMakeOffer } =
    useContext(ProfileContext);

  return (
    <ProfileProvider>
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
                <OwnedTab />
              </Tab>

              <Tab
                tabClassName={s.tab}
                eventKey="offerTab"
                title={`Offer (${profileMakeOffer?.total || 0})`}
              >
                <OfferTab />
              </Tab>

              <Tab
                tabClassName={s.tab}
                eventKey="listing"
                title={`Listing (${profileListing?.total})`}
              >
                <ListingTab />
              </Tab>
            </Tabs>
          </ClientOnly>
        </Container>
      </div>
    </ProfileProvider>
  );
};

export default Profile;
