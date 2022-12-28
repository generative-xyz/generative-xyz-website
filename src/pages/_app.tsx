import AuthWrapper from '@components/Utils/AuthWrapper';
import {
  SEO_DESCRIPTION,
  SEO_IMAGE,
  SEO_TITLE,
} from '@constants/seo-default-info';
import { WalletProvider } from '@contexts/wallet-context';
import store from '@redux';
import DatadogService from '@services/datadog';
import '@styles/index.scss';
import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

interface MyAppProps extends AppProps {
  Component: {
    Layout?: React.ExoticComponent<{
      children?: React.ReactNode;
    }>;
  } & NextComponentType<NextPageContext, unknown, unknown>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const { seoInfo = {} } = pageProps;
  const { title, description, image } = seoInfo;

  // const Layout = Component.Layout || React.Fragment;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/caching.sw.js', { scope: '/' })
        .then(function () {
          // eslint-disable-next-line no-console
          console.log('Service worker registered!');
        })
        .catch(function (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }

    const ddInstance = DatadogService.getInstance();
    ddInstance.init();
    ddInstance.startRUMTracking();

    return () => {
      ddInstance.stopRUMTracking();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title ?? SEO_TITLE}</title>
        <meta property="og:title" content={title ?? SEO_TITLE} />
        <meta name="og:description" content={description ?? SEO_DESCRIPTION} />
        <meta name="og:image" content={image ?? SEO_IMAGE} />
        <meta property="twitter:title" content={title ?? SEO_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={description ?? SEO_DESCRIPTION}
        />
        <meta name="twitter:image" content={image ?? SEO_IMAGE} />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <NextNprogress />

      <Provider store={store}>
        <WalletProvider>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </WalletProvider>
      </Provider>
    </>
  );
}
