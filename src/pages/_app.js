import '../styles/globals.css';

import ErrorBoundary from '../components/ErrorBoundary';
import Head from 'next/head';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {Component.pageName === '404' ? (
        <Component {...pageProps} />
      ) : (
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      )}
    </>
  );
}

export default MyApp;
