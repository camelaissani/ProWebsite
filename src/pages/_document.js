import { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

export default function MyDocument() {
  return (
    <Html translate="no">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          href="https://unpkg.com/@icon/icofont/icofont.css"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
