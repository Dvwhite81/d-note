'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
