'use client';

import { useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

const templates = {
  dark: {
    name: 'Dark Gradient',
    gradient: 'from-zinc-900 via-zinc-800 to-zinc-900',
    text: 'text-white',
    accent: 'text-zinc-400',
    bgGradient: 'linear-gradient(180deg, #09090b 0%, #27272a 50%, #09090b 100%)',
  },
  light: {
    name: 'Light Pastel',
    gradient: 'from-pink-100 via-rose-50 to-amber-50',
    text: 'text-zinc-900',
    accent: 'text-zinc-600',
    bgGradient: 'linear-gradient(180deg, #fdf2f8 0%, #fff1f2 50%, #fef3c7 100%)',
  },
  neon: {
    name: 'Neon',
    gradient: 'from-purple-600 via-pink-500 to-orange-400',
    text: 'text-white',
    accent: 'text-white/80',
    bgGradient: 'linear-gradient(180deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)',
    glow: 'shadow-[0_0_60px_rgba(236,72,153,0.5)]',
  },
  minimal: {
    name: 'Minimal',
    gradient: 'from-zinc-50 to-zinc-100',
    text: 'text-zinc-900',
    accent: 'text-zinc-500',
    bgGradient: 'linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)',
  },
};

export default function ResultCard({ responses = [], category = 'friends', template = 'dark', onTemplateChange }) {
  const cardRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(template || 'dark');
  const [generating, setGenerating] = useState(false);

  const currentTemplate = templates[selectedTemplate] || templates.dark;

  const interestingAnswers = responses.filter(a => a && typeof a === 'string').slice(0, 5);

  const handleTemplateChange = (newTemplate) => {
    setSelectedTemplate(newTemplate);
    onTemplateChange?.(newTemplate);
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    
    setGenerating(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 1080,
        height: 1920,
      });

      const link = document.createElement('a');
      link.download = `slambook-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating card:', error);
    } finally {
      setGenerating(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(templates).map(([key, tmpl]) => (
          <button
            key={key}
            onClick={() => handleTemplateChange(key)}
            className={`px-4 py-2 text-sm rounded-full border-2 transition-all ${
              selectedTemplate === key 
                ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg' 
                : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
            }`}
          >
            {tmpl.name}
          </button>
        ))}
      </div>

      <div 
        className="mx-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ width: '360px', height: '640px' }}
      >
        <div 
          ref={cardRef}
          className={`w-[1080px] h-[1920px] ${currentTemplate.text} p-16 flex flex-col relative ${currentTemplate.glow || ''}`}
          style={{ 
            background: currentTemplate.bgGradient,
            transform: 'scale(0.333)',
            transformOrigin: 'top left',
            width: '1080px',
            height: '1920px',
          }}
        >
          <div className="absolute top-12 left-0 right-0 text-center">
            <p className={`text-2xl uppercase tracking-[0.3em] font-medium ${currentTemplate.accent}`}>
              My friends think I am...
            </p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center px-8">
            {interestingAnswers.length > 0 ? (
              <div className="space-y-8">
                {interestingAnswers.map((answer, idx) => (
                  <p 
                    key={idx} 
                    className={`text-5xl font-bold capitalize ${selectedTemplate === 'neon' ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]' : ''}`}
                  >
                    {answer}
                  </p>
                ))}
              </div>
            ) : (
              <p className={`text-4xl font-medium ${currentTemplate.accent}`}>
                Share your slam book to see results!
              </p>
            )}
          </div>

          <div className="absolute bottom-16 left-0 right-0 text-center">
            <p className={`text-xl ${currentTemplate.accent}`}>
              slambook.app
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            'Download Card (1080x1920)'
          )}
        </button>
        <p className="text-center text-sm text-zinc-500">
          9:16 Instagram story format • PNG • High resolution
        </p>
      </div>
    </div>
  );
}
