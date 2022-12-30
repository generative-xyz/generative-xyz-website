import styles from './Header.module.scss';
import Button from '@components/Button';
import Link from '@components/Link';
import { ROUTE_PATH } from '@constants/route-path';
import { WalletContext } from '@contexts/wallet-context';
import React, { useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { formatAddress } from '@utils/format';
import SvgInset from '@components/SvgInset';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import { useRouter } from 'next/router';
import cs from 'classnames';

const LOG_PREFIX = 'MarketplaceHeader';

const MENU_HEADER = [
  { id: 1, name: 'create', route: ROUTE_PATH.CREATE_PROJECT },
  { id: 2, name: 'projects', route: ROUTE_PATH.GENERATIVE },
];

const Header: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const user = useAppSelector(getUserSelector);
  const router = useRouter();

  const handleConnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.connect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

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
                      className={cs(router.pathname === item.route)}
                      key={`header-${item.id}`}
                    >
                      <Link href={item.route}>{item.name}</Link>
                    </li>
                  ))}
              </ul>
            </Stack>
            {user.id ? (
              <div className="d-flex align-items-center gap-3">
                <Link href={ROUTE_PATH.PROFILE} className={styles.userAddress}>
                  {formatAddress(user.walletAddress)}
                </Link>
              </div>
            ) : (
              <Button onClick={handleConnectWallet}>Connect wallet</Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
