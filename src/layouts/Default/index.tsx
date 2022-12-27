import React, { ReactNode } from 'react';

import CheckoutModal from '@containers/CheckoutModal';

import Header from './components/Header';
import Footer from './components/Footer';

interface IProp {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProp> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <CheckoutModal />
      <Footer />
    </>
  );
};

export default DefaultLayout;
