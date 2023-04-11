import { useContext, FC, useState, useRef, useEffect, KeyboardEvent } from 'react'
import Context, { FirebaseContext } from '@/contexts/firebaseContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Loader } from './Loader'
import styles from '@/styles/Chat.module.css'
import Image from 'next/image'

export const Chat: FC = () => {
  const {auth, firestore} = useContext(Context) as FirebaseContext;
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const [messages, loading] = useCollectionData(
    query(collection(firestore, 'messages'), orderBy('createdAt'))
  )

  const scrollToBottom = (element: HTMLDivElement) => {
    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    if (chatRef.current) {
      scrollToBottom(chatRef.current)
    }
  }, [loading])

  const sendMessage = async () => {
    if (!user) return;
    if (value.trim() === '') return

    const docRef = await addDoc(collection(firestore, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value.trim(),
        createdAt: serverTimestamp(),
    });

    if (chatRef.current) {
      scrollToBottom(chatRef.current)
    }

    setValue('')
  }

  const handleEnterClick = (e:KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    sendMessage();
  }

  if (loading) return <Loader/>;

  const getClassNames = (senderId: string) => {
    return `${styles.chat__message} ${user?.uid === senderId ? styles.chat__message_right : styles.chat__message_left}`
  }

  return (
    <>
      <div className={styles.chat} ref={chatRef}>
        {messages?.map((message) => {
          return (
            <div key={message.uid + message.createdAt} className={getClassNames(message.uid)}>
              {message.displayName}
              <Image src={message.photoURL} alt='Sender avatar' width={25} height={25} className={styles.message__avatar}/>
              <div className={styles.message__content}>
                {message.text}
              </div>
            </div>
          )
        })}
      </div>
      {user && (
          <div className={styles.inputArea}>
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyUp={e => handleEnterClick(e)}
            />
            <button onClick={sendMessage}>Отправить</button>
          </div>
        )
      }
    </>
  )
}
