'use client'
import styles from '../styles/components/AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.bgContainer}>
      <div className={`${styles.gradientSphere} ${styles.sphere1}`}></div>
      <div className={`${styles.gradientSphere} ${styles.sphere2}`}></div>
      <div className={`${styles.gradientSphere} ${styles.sphere3}`}></div>
    </div>
  )
}