'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import ResultCard from '../../../components/ResultCard';

const mockResponses = [
  'Chaotic', 'Main character', 'The funny one', 
  'Night owl', 'Goofy', 'Chaotic', 'Main character'
];

export default function ResultsPage() {
  const params = useParams();
  const bookId = params.id;
  
  const [responses] = useState(mockResponses);
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState('dark');

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/book/${bookId}` 
    : `/book/${bookId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Fill out my slam book! ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBack />
      
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Your Results</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {responses.length} responses so far
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Card</h2>
                <ResultCard responses={responses} template={template} />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <p className="text-3xl font-bold">{responses.length}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Responses</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <p className="text-3xl font-bold">10</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Questions</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Share Your Book</h2>
                <div className="space-y-3">
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Share on WhatsApp
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Card Templates</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['dark', 'light', 'neon', 'minimal'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={`p-4 rounded-xl border-2 capitalize ${
                        template === t
                          ? 'border-black dark:border-white'
                          : 'border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
