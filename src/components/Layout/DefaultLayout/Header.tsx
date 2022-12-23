import Link from '@components/Link';
import { ROUTE } from '@constants/routes';
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
              <Link href={ROUTE.HOME}>G</Link>
            </h1>
            <ul className={styles.navBar}>
              <li>
                <Link href={ROUTE.CREATE_PROJECT}>Create</Link>
              </li>
              <li>
                <Link href={ROUTE.PROJECT_DETAIL}>Project Detail</Link>
              </li>
            </ul>
          </Stack>
          <Link href={ROUTE.PROFILE}>Profile</Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
