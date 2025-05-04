'use client';

import { useRouter } from 'next/navigation';

export default function CloseTheLoopPage() {
  const router = useRouter();
  
  return (
    <div className="p-6">
      <h1>Close the Loop Agent</h1>
    </div>
  );
} 