import Link from 'next/link';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Spill - Let them spill',
  description: 'Find out what your friends really think about you — no app needed.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Let them spill.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400">
              Find out what your friends really think about you.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
          >
            Create Your Slam Book
          </Link>

          <div className="pt-12 space-y-8">
            <h2 className="text-sm uppercase tracking-widest text-zinc-500">
              How it works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Create</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Pick a category and get your unique link in seconds.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Share</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Send the link to friends on WhatsApp or Instagram.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Get Results</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  See what they think and download a beautiful card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-zinc-500">
        <p>No app needed. Just share the link.</p>
      </footer>
    </div>
  );
}
