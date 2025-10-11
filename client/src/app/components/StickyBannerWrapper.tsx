'use client';

import dynamic from 'next/dynamic';
import styles from './UI/StickyBanner/StickyBanner.module.scss';

const StickyBanner = dynamic(
  () => import('./UI/StickyBanner/StickyBanner'),
  { ssr: false }
);

export default function StickyBannerWrapper() {
  return (
    <div className={styles.withBanner}>
      <StickyBanner />
    </div>
  );
}
