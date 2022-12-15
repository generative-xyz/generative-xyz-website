import React, { PropsWithChildren } from 'react';
import Header from '@components/Layout/DefaultLayout/Header';
import Footer from '@components/Layout/DefaultLayout/Footer';
import styles from './styles.module.scss';

const DefaultLayout: React.FC<PropsWithChildren> = ({
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

export default DefaultLayout;
