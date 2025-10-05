'use client';

import dynamic from 'next/dynamic';

const ZigZagSection = dynamic(() => import('@/components/atoms/ZigZagSection/ZigZagSection'), {
  ssr: false,
});

export default function ZigZagWrapper(props: any) {
  return <ZigZagSection {...props} />;
}
