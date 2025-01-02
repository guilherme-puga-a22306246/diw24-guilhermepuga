'use client'
import React from 'react'
import TechCard from '../../components/Card/TechCard'
import styles from './page.module.css'
import tecnologias from '@/app/data/tecnologias.json'

export default function Tecnologias() {
  const tecData = JSON.parse(JSON.stringify(tecnologias))

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tecnologias</h1>
      <div className={styles.grid}>
        {tecData.tecnologias.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>
    </div>
  )
}