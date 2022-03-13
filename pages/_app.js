import React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../src/components/Layout';

function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const isMounted = useMounted()

  return (
    <>
    {isMounted &&
    <QueryClientProvider client={queryClient}>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        <Layout>
        <Component {...pageProps} />
        </Layout>
    </CacheProvider>
    </QueryClientProvider>}
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
