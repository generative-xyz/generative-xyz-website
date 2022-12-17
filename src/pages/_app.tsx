import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import NextNprogress from 'nextjs-progressbar';
import store from '@redux';
import {
  SEO_TITLE,
  SEO_DESCRIPTION,
  SEO_IMAGE,
} from '@constants/seo-default-info';
import { WalletProvider } from '@contexts/wallet-context';
import '@styles/index.scss';
import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';

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

  const Layout = Component.Layout || React.Fragment;

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
          <MintGenerativeContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MintGenerativeContextProvider>
        </WalletProvider>
      </Provider>
    </>
  );
}
