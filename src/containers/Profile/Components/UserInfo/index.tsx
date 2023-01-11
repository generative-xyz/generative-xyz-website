import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import { CDN_URL } from '@constants/config';
import {
  IC_EDIT_PROFILE,
  IC_OFFER_SETTING,
  SOCIAL_ICONS,
} from '@constants/icons';
import { ProfileContext } from '@contexts/profile-context';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { formatAddress } from '@utils/format';
import cn from 'classnames';
import Image from 'next/image';
import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import s from './UserInfo.module.scss';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';
import Link from 'next/link';

export const UserInfo = (): JSX.Element => {
  const user = useAppSelector(getUserSelector);
  const { currentUser } = useContext(ProfileContext);
  const router = useRouter();

  return (
    <div className={s.userInfo}>
      <div
        className={cn(
          s.userInfo_cover,
          currentUser?.bgCover ? s.isBg : s.empty
        )}
      >
        {currentUser?.bgCover && (
          <img src={currentUser.bgCover} alt="user-cover" />
        )}
      </div>
      <Container>
        <Row>
          <Col xs={8}>
            <div className={s.userInfo_content}>
              <div className={s.userInfo_content_avatar}>
                <Image
                  src={
                    currentUser?.avatar
                      ? currentUser.avatar
                      : `${CDN_URL}/icons/logo-marketplace.svg`
                  }
                  alt={currentUser?.displayName || ''}
                  width={100}
                  height={100}
                />
              </div>
              <div className={s.userInfo_content_wallet}>
                <Text size={'18'} color={'black-06'} fontWeight={'semibold'}>
                  {currentUser?.walletAddress}
                </Text>
              </div>
              <div className={s.userInfo_content_display}>
                <div className={s.userName}>
                  <Heading as={'h4'} fontWeight={'semibold'}>
                    {currentUser?.displayName ||
                      formatAddress(currentUser?.walletAddress || '')}
                  </Heading>
                </div>
                {currentUser?.id === user?.id && (
                  <>
                    <div className={s.editProfile}>
                      <ButtonIcon
                        sizes="large"
                        variants={'ghost'}
                        startIcon={<SvgInset svgUrl={IC_EDIT_PROFILE} />}
                        onClick={() => router.push(ROUTE_PATH.EDIT_PROFILE)}
                      >
                        Edit profile
                      </ButtonIcon>
                    </div>
                    <div className={s.offerSetting}>
                      <ButtonIcon
                        sizes="large"
                        variants={'ghost'}
                        startIcon={<SvgInset svgUrl={IC_OFFER_SETTING} />}
                      >
                        Offer setting
                      </ButtonIcon>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col xs={4}>
            <div className={s.userInfo_socials}>
              <ul className={s.userInfo_socials_list}>
                {currentUser?.profileSocial?.web && (
                  <li className={s.userInfo_socials_item}>
                    <Link
                      target={'_blank'}
                      href={currentUser.profileSocial.web || '#'}
                    >
                      <SvgInset svgUrl={SOCIAL_ICONS.web} />
                    </Link>
                  </li>
                )}

                {currentUser?.profileSocial?.etherScan && (
                  <li className={s.userInfo_socials_item}>
                    <Link
                      target={'_blank'}
                      href={currentUser.profileSocial.etherScan || '#'}
                    >
                      <SvgInset svgUrl={SOCIAL_ICONS.etherScan} />
                    </Link>
                  </li>
                )}

                {currentUser?.profileSocial?.discord && (
                  <li className={s.userInfo_socials_item}>
                    <Link
                      target={'_blank'}
                      href={currentUser.profileSocial.discord}
                    >
                      <SvgInset svgUrl={SOCIAL_ICONS.discrod} />
                    </Link>
                  </li>
                )}

                {currentUser?.profileSocial?.twitter && (
                  <li className={s.userInfo_socials_item}>
                    <Link
                      target={'_blank'}
                      href={currentUser.profileSocial.twitter}
                    >
                      <SvgInset svgUrl={SOCIAL_ICONS.twitter} />
                    </Link>
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
