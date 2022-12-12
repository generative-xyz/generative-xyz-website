import React from 'react';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';
import store from '../redux';

interface MyAppProps extends AppProps {
  Component: {
    Layout?: React.ExoticComponent<{
      children?: React.ReactNode;
    }>;
  } & NextComponentType<NextPageContext, unknown, unknown>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || React.Fragment;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
