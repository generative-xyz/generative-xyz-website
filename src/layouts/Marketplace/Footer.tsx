import SvgInset from '@components/SvgInset';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import React from 'react';
import styles from './styles.module.scss';

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className={styles.footer}>
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
