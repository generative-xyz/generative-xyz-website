import s from './Profile.module.scss';
import React, { useContext } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import ClientOnly from '@components/Utils/ClientOnly';
import { OwnedTab } from '@containers/Profile/Components/OwnedTab';
import { UserInfo } from '@containers/Profile/Components/UserInfo';
import { OfferTab } from '@containers/Profile/Components/Offer';
import { ProfileContext, ProfileProvider } from '@contexts/profile-context';
import EditProfile from './EditProfile';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';

// const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const router = useRouter();

  const { profileTokens, profileProjects, profileMakeOffer } =
    useContext(ProfileContext);

  const pageRender = () => {
    switch (router.pathname) {
      case ROUTE_PATH.PROFILE:
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
                    <OwnedTab />
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
          </div>
        );

      case ROUTE_PATH.EDIT_PROFILE:
        return <EditProfile />;

      default:
        return <div></div>;
    }
  };

  return <ProfileProvider>{pageRender()}</ProfileProvider>;
};

export default Profile;
