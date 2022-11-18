import { Head, Html, Main, NextScript } from 'next/document';

import { basePath } from '../../next.config';

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
        <link rel="icon" href={`${basePath}/favicon.svg`} />
      </Head>
      <body className="bg-[#f3f2ef]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
