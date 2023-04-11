import { FC, useContext, useEffect } from 'react'
import Head from 'next/head';
import Context, { FirebaseContext } from '@/contexts/firebaseContext'
import { provider } from '@/utils/firebase'
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { CHAT_ROUTE } from '@/utils/const';
import styles from '@/styles/Login.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';

const Login: FC = () => {
  const {auth} = useContext(Context) as FirebaseContext;
  const router = useRouter();
  const [user] = useAuthState(auth)
  
  const login = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      router.push(CHAT_ROUTE);
    }
  }, [user])
  

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.login}>
        <button className={styles.login__button} onClick={login}>
          Login
        </button>
      </div>
    </>
  )
}

export default Login;
