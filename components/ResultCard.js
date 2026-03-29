'use client';

import { useRef } from 'react';

const templates = {
  dark: {
    name: 'Dark Gradient',
    gradient: 'from-zinc-900 via-zinc-800 to-zinc-900',
    text: 'text-white',
    accent: 'text-zinc-400',
  },
  light: {
    name: 'Light Pastel',
    gradient: 'from-pink-100 via-rose-50 to-amber-50',
    text: 'text-zinc-900',
    accent: 'text-zinc-600',
  },
  neon: {
    name: 'Neon',
    gradient: 'from-purple-600 via-pink-500 to-orange-400',
    text: 'text-white',
    accent: 'text-white/80',
  },
  minimal: {
    name: 'Minimal',
    gradient: 'from-zinc-50 to-zinc-100',
    text: 'text-zinc-900',
    accent: 'text-zinc-500',
  },
};

export default function ResultCard({ responses = [], category = 'friends', template = 'dark' }) {
  const cardRef = useRef(null);
  const selectedTemplate = templates[template] || templates.dark;

  const topAnswers = responses.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        {Object.keys(templates).map((key) => (
          <button
            key={key}
            onClick={() => {}}
            className={`px-3 py-1 text-xs rounded-full border ${
              template === key 
                ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
                : 'border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {templates[key].name}
          </button>
        ))}
      </div>

      <div 
        ref={cardRef}
        className={`w-[360px] h-[640px] mx-auto rounded-3xl bg-gradient-to-br ${selectedTemplate.gradient} ${selectedTemplate.text} p-8 flex flex-col shadow-2xl overflow-hidden`}
        style={{ aspectRatio: '9/16' }}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
          <p className={`text-sm uppercase tracking-widest ${selectedTemplate.accent}`}>
            My friends think I am...
          </p>
          
          <div className="space-y-4">
            {topAnswers.length > 0 ? (
              topAnswers.map((answer, idx) => (
                <p key={idx} className="text-2xl font-bold capitalize">
                  {answer}
                </p>
              ))
            ) : (
              <p className="text-xl font-medium opacity-60">
                Share your slam book to see results!
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className={`text-xs ${selectedTemplate.accent}`}>
            spill.app
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-500">
        Card preview (9:16 Instagram story format)
      </p>
    </div>
  );
}
