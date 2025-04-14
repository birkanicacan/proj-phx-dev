'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 text-center relative">
        <p className="text-white">
          Announcing our $20.8M Series A to build the future of customer intelligence.{' '}
          <Link href="#" className="underline">Read more!</Link>
        </p>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">&times;</button>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Enterpet" width={120} height={32} className="mr-8" />
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="text-white hover:opacity-80">Product</Link>
            <Link href="#" className="text-white hover:opacity-80">Customers</Link>
            <Link href="#" className="text-white hover:opacity-80">Resources</Link>
            <Link href="#" className="text-white hover:opacity-80">Pricing</Link>
            <Link href="#" className="text-white hover:opacity-80">Changelog</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" className="text-white hover:opacity-80">Sign In</Link>
          <Link href="/auth/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full hover:opacity-90">
            Try Now!
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 text-center py-20">
        <h1 className="text-6xl font-bold mb-6">
          Transform customer feedback into{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            product growth
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Automatically unify and accurately categorize feedback to capture the Voice of the Customer—
          so your company can build products customers love and drive revenue.
        </p>
        <div className="flex justify-center">
          <Link href="/auth/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-full hover:opacity-90 text-lg font-medium">
            Try Now!
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-20">
          <p className="text-gray-400 mb-8">Redefining how the best companies build with feedback</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-70">
            <Image src="/logos/canva.svg" alt="Canva" width={120} height={40} />
            <Image src="/logos/notion.svg" alt="Notion" width={120} height={40} />
            <Image src="/logos/monday.svg" alt="Monday" width={120} height={40} />
            <Image src="/logos/loom.svg" alt="Loom" width={120} height={40} />
            <Image src="/logos/linear.svg" alt="Linear" width={120} height={40} />
            <Image src="/logos/vimeo.svg" alt="Vimeo" width={120} height={40} />
            <Image src="/logos/strava.svg" alt="Strava" width={120} height={40} />
            <Image src="/logos/nextdoor.svg" alt="Nextdoor" width={120} height={40} />
            <Image src="/logos/hinge.svg" alt="Hinge" width={120} height={40} />
            <Image src="/logos/wahoo.svg" alt="Wahoo" width={120} height={40} />
          </div>
        </div>
      </main>
    </div>
  );
} 