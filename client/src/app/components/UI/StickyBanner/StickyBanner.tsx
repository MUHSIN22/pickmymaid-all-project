'use client';

import React from 'react';
import styles from './StickyBanner.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const StickyBanner = () => {
  const handleBannerClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.bannerContainer}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div 
          className={styles.banner} 
          onClick={() => handleBannerClick('/neet-pg-allotment-predictor')}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className={styles.content}>
            <span className={styles.text}>
              <motion.div 
                className={styles.pulseDot}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className={styles.highlight}>NEET PG ALLOTMENT PREDICTOR </span>
              <span className={styles.bold}>Predict your NEET PG Allotment</span>
              <span className={styles.cta}>
                Take Assessment
                <motion.span 
                  className={styles.newBadge}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >NEW</motion.span>
                <span>→</span>
              </span>
            </span>
          </div>
        </motion.div>
      </motion.div>    </AnimatePresence>
  );
};

export default StickyBanner;
