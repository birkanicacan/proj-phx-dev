'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../components/MainLayout';

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
  }, [router]);

  return <MainLayout>{children}</MainLayout>;
} 