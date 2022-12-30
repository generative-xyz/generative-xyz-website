import AvatarInfo from '@components/AvatarInfo';
import ButtonIcon from '@components/ButtonIcon';
import Link from '@components/Link';
import SvgInset from '@components/SvgInset';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { CDN_URL } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { WalletContext } from '@contexts/wallet-context';
import { LogLevel } from '@enums/log-level';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { formatAddress } from '@utils/format';
import log from '@utils/logger';
import cs from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styles from './Header.module.scss';
import useOnClickOutside from '@hooks/useOnClickOutSide';

const LOG_PREFIX = 'MarketplaceHeader';

const MENU_HEADER = [
  {
    id: 'menu-1',
    name: 'create',
    route: ROUTE_PATH.CREATE_PROJECT,
    activePath: 'mint-generative',
  },
  {
    id: 'menu-1',
    name: 'marketplace',
    route: ROUTE_PATH.HOME,
    activePath: 'marketplace',
  },
];

const Header: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const user = useAppSelector(getUserSelector);
  const router = useRouter();
  const activePath = router.asPath.split('/')[1];
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const PROFILE_MENU = [
    {
      id: 'profile-1',
      name: 'View Profile',
      onClick: () => router.push(ROUTE_PATH.PROFILE),
    },
    {
      id: 'profile-2',
      name: 'Disconnect wallet',
      onClick: () => walletCtx.disconnect(),
    },
  ];

  const handleConnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.connect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const renderProfileHeader = () => {
    return (
      <div className="">
        <div className={styles.username}>
          <span>{user.displayName || formatAddress(user.walletAddress)}</span>
          <SvgInset svgUrl={`${CDN_URL}/icons/ic-caret-down.svg`}></SvgInset>
        </div>
        <div className={styles.price}>
          {0}
          <SvgInset svgUrl={`${CDN_URL}/icons/ic-eth-token.svg`} />
        </div>
      </div>
    );
  };

  const ProfileDropdown = () => {
    return (
      <ul className={styles.dropdown} ref={dropdownRef}>
        {PROFILE_MENU?.length > 0 &&
          PROFILE_MENU.map(item => (
            <li className="dropdown-item" onClick={item.onClick} key={item.id}>
              {item.name}
            </li>
          ))}
      </ul>
    );
  };

  useOnClickOutside(dropdownRef, () => setOpenProfile(false));

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerWrapper}>
          <div className="d-flex justify-content-between w-100">
            <Stack direction="horizontal">
              <h1>
                <Link href={ROUTE_PATH.HOME}>
                  <SvgInset
                    svgUrl={LOGO_MARKETPLACE_URL}
                    className={styles.logo}
                  />
                </Link>
              </h1>
              <ul className={styles.navBar}>
                {MENU_HEADER?.length > 0 &&
                  MENU_HEADER.map(item => (
                    <li
                      className={cs(
                        activePath === item.activePath && styles.active
                      )}
                      key={`header-${item.id}`}
                    >
                      <Link href={item.route}>{item.name}</Link>
                    </li>
                  ))}
              </ul>
            </Stack>

            {user.id ? (
              <div className="position-relative">
                <AvatarInfo
                  imgSrc={user.avatar}
                  width={48}
                  height={48}
                  leftContent={renderProfileHeader()}
                  onClick={() => setOpenProfile(!openProfile)}
                  wrapperStyle={{ cursor: 'pointer' }}
                />
                {openProfile && <ProfileDropdown />}
              </div>
            ) : (
              <ButtonIcon onClick={handleConnectWallet}>
                Connect wallet
              </ButtonIcon>
            )}
          </div>
        </div>
      </Container>
      <div className="divider"></div>
    </header>
  );
};

export default Header;
