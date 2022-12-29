import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        history.scrollRestoration = "manual"
        `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
