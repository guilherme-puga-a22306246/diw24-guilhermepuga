'use client'
import React from 'react'
import { Product } from '../models/interfaces'
import useSWR from 'swr'
import Card from '../../components/Card/Card'
import styles from './page.module.css'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>(
    'https://deisishop.pythonanywhere.com/products',
    fetcher
  )

  if (error) return <div className={styles.error}>Erro ao carregar os produtos: {error.message}</div>
  if (isLoading) return <div className={styles.loading}>Carregando...</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <div className={styles.grid}>
        {data?.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}