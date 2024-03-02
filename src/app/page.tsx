import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Admin Panel Wellnesshub</h1>
      <button className={styles.button}><a href='/adminauth/login' className={styles.signin}>Signin</a></button>
    </main>
  )
}
