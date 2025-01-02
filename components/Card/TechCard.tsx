import React from 'react'
import Image from 'next/image'
import styles from './TechCard.module.css'

interface Rating {
  rate: number
  count: number
}

interface Technology {
  id: number
  title: string
  image: string
  description: string
  rating: Rating
}

interface TechCardProps {
  tech: Technology
}

const TechCard = ({ tech }: TechCardProps) => {
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
          src={tech.image}
          alt={tech.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{tech.title}</h2>
        <p className={styles.description}>{tech.description}</p>
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>
            {renderStars(Math.round(tech.rating.rate))}
          </div>
          <span className={styles.ratingCount}>
            ({tech.rating.count} review{tech.rating.count !== 1 ? 's' : ''})
          </span>
        </div>
      </div>
    </div>
  )
}

export default TechCard