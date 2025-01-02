import React from 'react'
import Image from 'next/image'
import { Product } from '../../app/models/interfaces'
import styles from './Card.module.css'

interface CardProps {
  product: Product
}

const Card = ({ product }: CardProps) => {
  // Função para renderizar estrelas do rating
  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rate ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            $ {product.price.toFixed(2)}
          </span>
          <span className={styles.category}>
            {product.category}
          </span>
        </div>
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>
            {renderStars(Math.round(product.rating.rate))}
          </div>
          <span className={styles.ratingCount}>
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card