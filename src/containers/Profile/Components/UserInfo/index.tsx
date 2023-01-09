import cn from 'classnames';
import s from './UserInfo.module.scss';
import Image from 'next/image';
import SvgInset from '@components/SvgInset';
import {
  IC_EDIT_PROFILE,
  IC_OFFER_SETTING,
  SOCIAL_ICONS,
} from '@constants/icons';
import { CDN_URL } from '@constants/config';
import { formatAddress } from '@utils/format';
import ButtonIcon from '@components/ButtonIcon';
import Text from '@components/Text';
import Heading from '@components/Heading';
import { Row, Container, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ProfileContext } from '@contexts/profile-context';

export const UserInfo = (): JSX.Element => {
  const { user } = useContext(ProfileContext);

  return (
    <div className={s.userInfo}>
      <div className={cn(s.userInfo_cover, user?.bgCover ? s.isBg : s.empty)}>
        {user?.bgCover && <img src={user.bgCover} alt="user-cover" />}
      </div>
      <Container>
        <Row>
          <Col xs={8}>
            <div className={s.userInfo_content}>
              <div className={s.userInfo_content_avatar}>
                <Image
                  src={
                    user?.avatar
                      ? user.avatar
                      : `${CDN_URL}/icons/logo-marketplace.svg`
                  }
                  alt={user?.displayName || ''}
                  width={100}
                  height={100}
                />
              </div>
              <div className={s.userInfo_content_wallet}>
                <Text size={'18'} color={'black-06'} fontWeight={'semibold'}>
                  {user?.walletAddress}
                </Text>
              </div>
              <div className={s.userInfo_content_display}>
                <div className={s.userName}>
                  <Heading as={'h4'} fontWeight={'semibold'}>
                    {user?.displayName ||
                      formatAddress(user?.walletAddress || '')}
                  </Heading>
                </div>
                <div className={s.editProfile}>
                  <ButtonIcon
                    variants={'ghost'}
                    endIcon={<SvgInset svgUrl={IC_EDIT_PROFILE} />}
                  >
                    Edit profile
                  </ButtonIcon>
                </div>
                <div className={s.offerSetting}>
                  <ButtonIcon
                    variants={'ghost'}
                    endIcon={<SvgInset svgUrl={IC_OFFER_SETTING} />}
                  >
                    Offer setting
                  </ButtonIcon>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={4}>
            <div className={s.userInfo_socials}>
              <ul className={s.userInfo_socials_list}>
                {user?.profileSocial?.web && (
                  <li className={s.userInfo_socials_item}>
                    <a href={user.profileSocial.web || '#'}>
                      <SvgInset svgUrl={SOCIAL_ICONS.web} />
                    </a>
                  </li>
                )}

                {user?.profileSocial?.etherScan && (
                  <li className={s.userInfo_socials_item}>
                    <a href={user.profileSocial.etherScan || '#'}>
                      <SvgInset svgUrl={SOCIAL_ICONS.etherScan} />
                    </a>
                  </li>
                )}

                {user?.profileSocial?.discord && (
                  <li className={s.userInfo_socials_item}>
                    <a href={user.profileSocial.discord}>
                      <SvgInset svgUrl={SOCIAL_ICONS.discrod} />
                    </a>
                  </li>
                )}

                {user?.profileSocial?.twitter && (
                  <li className={s.userInfo_socials_item}>
                    <a href={user.profileSocial.twitter}>
                      <SvgInset svgUrl={SOCIAL_ICONS.twitter} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
