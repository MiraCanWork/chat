import Head from 'next/head'
import { FC } from 'react'
import { Chat } from '@/components/Chat'

const Home: FC = () => {
  return (
      <>
        <Head>
          <title>Chat App</title>
        </Head>
        <Chat/>
      </>
  )
}

export default Home
