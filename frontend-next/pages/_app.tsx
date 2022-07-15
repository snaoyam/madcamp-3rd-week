import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Appbar from '../components/appbar'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    window.addEventListener("dragover", function (e) {
      e.preventDefault();
    }, false);
    window.addEventListener("drop", function (e) {
      e.preventDefault();
    }, false);
  })
  
  return (
    <React.Fragment>
      <Head>
        <title>Title</title>
      </Head>
      <Appbar />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
