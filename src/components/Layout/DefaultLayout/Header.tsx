import styles from './Header.module.scss';
import Button from '@components/ButtonIcon';
import Link from '@components/Link';
import { ROUTE_PATH } from '@constants/route-path';
import { WalletContext } from '@contexts/wallet-context';
import React, { useContext, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { formatAddress } from '@utils/format';

const LOG_PREFIX = 'Header';

const Header: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const user = useAppSelector(getUserSelector);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      await walletCtx.connect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerWrapper}>
          <div className="d-flex justify-content-between w-100">
            <Stack direction="horizontal">
              <h1>
                <Link href={ROUTE_PATH.HOME}>G</Link>
              </h1>
              <ul className={styles.navBar}>
                <li>
                  <Link href={ROUTE_PATH.CREATE_PROJECT}>Create</Link>
                </li>
                <li>
                  <Link href={ROUTE_PATH.GENERATIVE}>Projects</Link>
                </li>
              </ul>
            </Stack>
            {user.id ? (
              <div className="d-flex align-items-center gap-3">
                <Link href={ROUTE_PATH.PROFILE} className={styles.userAddress}>
                  {formatAddress(user.walletAddress)}
                </Link>
              </div>
            ) : (
              <Button disabled={isConnecting} onClick={handleConnectWallet}>
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
