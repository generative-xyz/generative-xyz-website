import SvgInset from '@components/SvgInset';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import React from 'react';
import styles from './styles.module.scss';

interface IProp {
  theme?: 'light' | 'dark';
}

const Footer: React.FC<IProp> = ({ theme = 'light' }): React.ReactElement => {
  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.footer_content}>
        <div>
          <SvgInset svgUrl={LOGO_MARKETPLACE_URL} />
        </div>
        <div>© 2022 Generative.</div>
        <div>Contact us: team@generative.xyz</div>
      </div>
    </footer>
  );
};

export default Footer;
