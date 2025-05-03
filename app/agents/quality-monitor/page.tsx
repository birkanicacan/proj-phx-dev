'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QualityMonitorRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/agents/quality-monitor/new');
  }, [router]);
  return null;
} 