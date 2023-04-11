import {Header} from '@/components/Header'
import '@/styles/globals.css'
import Context from '@/contexts/firebaseContext'
import { auth, firebase, firestore } from '@/utils/firebase';
import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Context.Provider value={{
      auth,
      firestore,
      firebase
    }}>
      <Header/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  )
}
