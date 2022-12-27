import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

import { LOGO_URL } from '@constants/common';

import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={s.Header}>
      <Container className={s.Header_container}>
        <Link href="/">
          <img src={LOGO_URL} alt="Logo" className={s.Header_logo} />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
