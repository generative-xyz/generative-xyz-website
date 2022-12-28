import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './styles.module.scss';

const MarketplaceLayout: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketplaceLayout;
