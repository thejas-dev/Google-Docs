import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps:  { session, ...pageProps}, }) {

  return (
  	<>
  	<Head>
  		<link
		    href="https://fonts.googleapis.com/icon?family=Material+Icons"
		    rel="stylesheet"
		/>
  	</Head>
  	<SessionProvider session={session}>
      <ThemeProvider>
    	 <Component {...pageProps} />
    	</ThemeProvider>
    </SessionProvider>
  	</>
  	)
}

export default MyApp;
