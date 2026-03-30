'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
}

function FloatingCard({ children, delay = 0, className = '' }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <FloatingCard delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full border border-zinc-200 dark:border-zinc-800 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">No app needed</span>
              </div>
            </FloatingCard>

            <FloatingCard delay={200}>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
                  Let them
                </span>
                <br />
                <span className="text-5xl md:text-7xl">spill.</span>
              </h1>
            </FloatingCard>

            <FloatingCard delay={300}>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                Find out what your friends really think about you. 
                Create a slam book, share the link, and watch the answers roll in.
              </p>
            </FloatingCard>

            <FloatingCard delay={400}>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-10 py-5 text-lg font-bold bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 active:scale-95 transition-transform shadow-2xl hover:shadow-black/25 dark:hover:shadow-white/25"
              >
                Create Your Slam Book
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </FloatingCard>
          </div>

          <FloatingCard delay={500}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <p className="text-4xl font-bold">10k+</p>
                <p className="text-sm text-zinc-500 mt-1">Books Created</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">50k+</p>
                <p className="text-sm text-zinc-500 mt-1">Responses</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm text-zinc-500 mt-1">Free</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={600}>
            <div className="space-y-8">
              <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium">
                How it works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-pink-500/50 dark:hover:border-pink-500/50 transition-all hover:scale-105">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    1
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Create</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Pick a category and customize your questions. Get your unique link instantly.
                    </p>
                  </div>
                </div>
                
                <div className="group relative p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all hover:scale-105">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    2
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Share</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Send the link to friends on WhatsApp, Instagram, or any platform you like.
                    </p>
                  </div>
                </div>
                
                <div className="group relative p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all hover:scale-105">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    3
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Get Results</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      See what they think and download a beautiful shareable card for your story.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={700}>
            <div className="p-8 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-4">Ready to find out?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                Join thousands of people who have discovered what their friends really think about them.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          </FloatingCard>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p>Made with curiosity</p>
          <span className="hidden md:inline">•</span>
          <p>No app needed. Just share the link.</p>
        </div>
      </footer>
    </div>
  );
}
