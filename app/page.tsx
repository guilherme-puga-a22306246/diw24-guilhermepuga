'use client'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bem-vindo à nossa loja!</h1>
        <p className={styles.description}>
          Explore nossa seleção de produtos e tecnologias.
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/produtos" className={styles.button}>
            Ver Produtos
          </Link>
          <Link href="/tecnologias" className={styles.button}>
            Ver Tecnologias
          </Link>
        </div>
      </div>
    </div>
  )
}