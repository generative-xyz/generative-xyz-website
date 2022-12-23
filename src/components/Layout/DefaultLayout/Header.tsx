import Link from '@components/Link';
import { ROUTE_PATH } from '@constants/route-path';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import styles from './styles.module.scss';

const Header: React.FC = (): React.ReactElement => {
  return (
    <header>
      <Container>
        <div className={styles.headerWrapper}>
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
        </div>
      </Container>
    </header>
  );
};

export default Header;
