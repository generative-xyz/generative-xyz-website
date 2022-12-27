import React from 'react';
import { LOGO_URL } from '@constants/common';
import s from './Header.module.scss';
import SvgInset from '@components/SvgInset';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={s.Header}>
      <div className={`${s.Header_container} container`}>
        <Link href="/" className={s.Header_logo}>
          <SvgInset svgUrl={LOGO_URL} className={s.Header_logo} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
