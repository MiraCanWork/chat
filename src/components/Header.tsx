import { FC, useContext } from 'react'
import styles from '@/styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { LOGIN_ROUTE } from '@/utils/const'
import { useAuthState } from 'react-firebase-hooks/auth'
import Context, { FirebaseContext } from '@/contexts/firebaseContext'

export const Header: FC = () => {
  const {auth} = useContext(Context) as FirebaseContext;
  const [user] = useAuthState(auth)

  return (
    <header className={styles.header}>
      <div className={styles.header__userInfo}>
        {user && 
          (<>
            {user.photoURL && <Image src={user.photoURL} width={30} height={30} alt="User avatar"/>}
            {user.displayName}
          </>)
        }
        
      </div>
      <nav>
        {user ?
              <button className={styles.header__button} onClick={()=>auth.signOut()}>
                Logout
              </button>  
              :
              <Link href={LOGIN_ROUTE}>
                Login
              </Link>  
        }
        
      </nav>
    </header>
  )
}
