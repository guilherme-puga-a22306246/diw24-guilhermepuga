import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>React e Next.js</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/produtos" className={styles.link}>
          Produtos
        </Link>
        <Link href="/tecnologias" className={styles.link}>
          Tecnologias
        </Link>
      </nav>
    </header>
  )
}