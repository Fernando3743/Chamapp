'use client'

import { useEffect } from 'react'

export function useScrollAnimations() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (link) {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const target = document.querySelector(targetId)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          entry.target.dataset.animated = 'true'
        }
      })
    }, observerOptions)

    // Observe elements for animation
    setTimeout(() => {
      const glassElements = document.querySelectorAll('.glass:not([data-animated])')
      glassElements.forEach(element => {
        element.style.opacity = '0'
        element.style.transform = 'translateY(30px)'
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(element)
      })
    }, 100)

    // Event listeners
    document.addEventListener('click', handleSmoothScroll)

    return () => {
      document.removeEventListener('click', handleSmoothScroll)
      observer.disconnect()
    }
  }, [])
}

export function useStatsAnimation() {
  useEffect(() => {
    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 100
      const duration = 2000 // 2 seconds
      const stepTime = duration / 100
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        
        if (target >= 1000000) {
          element.textContent = (current / 1000000).toFixed(0) + 'M+'
        } else if (target >= 1000) {
          element.textContent = (current / 1000).toFixed(0) + 'K+'
        } else if (target % 1 !== 0) {
          element.textContent = current.toFixed(1) + '%'
        } else {
          element.textContent = Math.floor(current)
        }
      }, stepTime)
      
      return timer
    }

    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true'
          const statNumber = entry.target.querySelector('.text-5xl')
          if (!statNumber) return
          
          const targetText = statNumber.textContent
          let target = 0
          
          if (targetText.includes('K+')) {
            target = parseInt(targetText) * 1000
          } else if (targetText.includes('M+')) {
            target = parseInt(targetText) * 1000000
          } else if (targetText.includes('%')) {
            target = parseFloat(targetText)
          } else if (targetText === '24/7') {
            return // Skip animation for 24/7
          }
          
          if (target > 0) {
            animateCounter(statNumber, target)
          }
        }
      })
    }, { threshold: 0.5 })

    setTimeout(() => {
      const statSections = document.querySelectorAll('.stats-section .glass')
      statSections.forEach(stat => {
        if (!stat.dataset.animated) {
          statObserver.observe(stat)
        }
      })
    }, 100)

    return () => {
      statObserver.disconnect()
    }
  }, [])
}