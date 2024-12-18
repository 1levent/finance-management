'use client';

import { useEffect, useState } from 'react';

interface IClientOnlyProps {
  children: React.ReactNode;
}

export default function ClientOnly({ children }: IClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
} 