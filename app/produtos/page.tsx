'use client'
import React, { useState, useEffect } from 'react'
import { Product } from '../models/interfaces'
import useSWR from 'swr'
import Card from '../../components/Card/Card'
import styles from './page.module.css'
import Link from 'next/link' // Adicione esta importação

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

  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])

  // Efeito para filtrar produtos
  useEffect(() => {
    if (data) {
      const filtered = data.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }, [search, data])

  // Efeito para carregar carrinho do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [])

  // Efeito para salvar carrinho no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  // Função para adicionar ao carrinho
  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product])
  }

  // Função para comprar produtos
  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: false,
        coupon: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(() => {
      setCart([])
      alert('Compra realizada com sucesso!')
    }).catch(() => {
      console.log("error ao comprar")
      alert('Erro ao realizar a compra. Tente novamente.')
    })
  }

  if (error) return <div className={styles.error}>Erro ao carregar os produtos: {error.message}</div>
  if (isLoading) return <div className={styles.loading}>Carregando...</div>

  return (
    <div className={styles.container}>
      {/* Botão para voltar */}
      <Link href="/" className={styles.backButton}>
        Voltar
      </Link>

      <h1 className={styles.title}>Produtos</h1>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.cartInfo}>
        Itens no carrinho: {cart.length}
      </div>

      <div className={styles.grid}>
        {filteredData.map(product => (
          <Card 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <div className={styles.cartSection}>
        <h2>Carrinho</h2>
        <div className={styles.cartGrid}>
          {cart.map((product, index) => (
            <Card 
              key={`${product.id}-${index}`} 
              product={product} 
              onAddToCart={addToCart}
              isInCart
            />
          ))}
        </div>
        {cart.length > 0 && (
          <div className={styles.cartActions}>
            <div className={styles.cartTotal}>
              Total: $ {cart.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
            </div>
            <button 
              className={styles.buyButton}
              onClick={buy}
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}