'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputClick = () => {
    if (!email && !password) {
      setEmail('birkan@acme.com');
      setPassword('••••••••');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the signup process
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header */}
      <nav className="px-6 py-4">
        <div className="container mx-auto">
          <Link href="/">
            <Image src="/logo.svg" alt="Enterpret" width={120} height={32} />
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Start your journey
            </h1>
            <p className="text-gray-400">
              Join thousands of companies using Enterpret to build better products
            </p>
          </div>

          <div className="bg-[rgb(24,24,24)] rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={handleInputClick}
                  className="w-full px-4 py-3 bg-[rgb(32,32,32)] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={handleInputClick}
                  className="w-full px-4 py-3 bg-[rgb(32,32,32)] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            By signing up, you agree to our{' '}
            <Link href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 