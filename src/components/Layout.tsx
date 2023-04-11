import { ReactNode, useContext, FC } from 'react'
import styles from '@/styles/Layout.module.css'

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles.mainLayout}>
      {children}
    </main>
  )
}
