import { LOGO_GENERATIVE, SOCIALS } from '@constants/common';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import SvgInset from '@components/SvgInset';

interface IProp {
  theme?: 'light' | 'dark';
}

const Footer: React.FC<IProp> = ({ theme = 'light' }): React.ReactElement => {
  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.footer_content}>
        <div className={styles.footer_content_logo}>
          <Image alt="logo" src={LOGO_GENERATIVE} width={64} height={64} />
        </div>
        <div className={styles.footer_info}>
          <p>© 2022 Generative.</p>
          <ul className={styles.footer_socials}>
            <li>
              <a
                href={SOCIALS.discord}
                target="_blank"
                className={styles.footer_bottomSocialItem}
                rel="noreferrer"
              >
                <SvgInset
                  svgUrl={
                    'https://cdn.autonomous.ai/static/upload/images/common/upload/20221012/Groupaa7416858b.svg'
                  }
                />
              </a>
            </li>
            <li>
              <a
                href={SOCIALS.twitter}
                target="_blank"
                className={styles.footer_bottomSocialItem}
                rel="noreferrer"
              >
                <SvgInset
                  svgUrl={
                    'https://cdn.autonomous.ai/static/upload/images/common/upload/20221012/Group-10ab2c8e17e.svg'
                  }
                />
              </a>
            </li>
          </ul>
        </div>
        <div>Contact us: team@generative.xyz</div>
      </div>
    </footer>
  );
};

export default Footer;
