'use client';

import { useEffect, useState, useRef } from 'react';
import { usePageTranslations } from '../../hooks/usePageTranslations';

const AnimatedCounter = ({ end, suffix, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div className="stat-number">
      {count}{suffix}
    </div>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const { t } = usePageTranslations('home');

  const stats = [
    { value: 10000, suffix: '+', label: t('activeBusinesses') },
    { value: 50, suffix: 'M+', label: t('transactionsProcessed') },
    { value: 99.9, suffix: '%', label: t('uptimeGuarantee') },
    { value: 24, suffix: '/7', label: t('customerSupport') }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <section ref={statsRef} className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;