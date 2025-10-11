"use client";

import { useRouter } from 'next/navigation';

type IProps = {
  children: React.ReactNode;
  isBlur?: boolean;
};

const ForPremium = ({ children, isBlur }: IProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (isBlur) router.push('/pricing');
      }}
      style={{ filter: isBlur ? 'blur(3px)' : '' }}
    >
      {children}
    </div>
  );
};

export default ForPremium;
