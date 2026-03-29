'use client';

import Link from 'next/link';

export default function Navbar({ showBack = false }) {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold tracking-tight">
        Spill
      </Link>
      <div className="flex items-center gap-4">
        {showBack && (
          <Link 
            href="/" 
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Back
          </Link>
        )}
      </div>
    </nav>
  );
}
