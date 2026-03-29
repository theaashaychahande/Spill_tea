'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { subscribeToBook } from '../../../lib/firebase';
import html2canvas from 'html2canvas';

const FILLER_NAMES = [
  'Anonymous Friend', 'Mystery Pal', 'Secret Admirer', 'Hidden Buddy',
  'Shadow Companion', 'Cloaked Confidant', 'Masked Mate', 'Enigma Pal',
  'Veiled Buddy', 'Disguised Friend', 'Incognito Pal', ' undercover Pal'
];

function getRandomFillerName() {
  return FILLER_NAMES[Math.floor(Math.random() * FILLER_NAMES.length)];
}

function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function calculateStats(responses, questions) {
  const stats = {
    totalResponses: responses.length,
    mcqStats: {},
    ratingStats: {},
    oneWordAnswers: [],
    oneLineAnswers: [],
  };

  questions.forEach(q => {
    if (q.type === 'mcq') {
      stats.mcqStats[q.id] = {
        question: q.question,
        options: q.options || [],
        counts: {},
        total: 0,
      };
      q.options?.forEach(opt => {
        stats.mcqStats[q.id].counts[opt] = 0;
      });
    } else if (q.type === 'rating') {
      stats.ratingStats[q.id] = {
        question: q.question,
        ratings: [],
        average: 0,
      };
    }
  });

  responses.forEach(response => {
    Object.entries(response.answers || {}).forEach(([qId, answer]) => {
      if (!answer) return;

      const question = questions.find(q => q.id === qId);
      if (!question) return;

      if (question.type === 'mcq') {
        if (stats.mcqStats[qId]?.counts !== undefined) {
          stats.mcqStats[qId].counts[answer] = (stats.mcqStats[qId].counts[answer] || 0) + 1;
          stats.mcqStats[qId].total++;
        }
      } else if (question.type === 'rating') {
        const rating = parseInt(answer, 10);
        if (!isNaN(rating)) {
          stats.ratingStats[qId].ratings.push(rating);
          const sum = stats.ratingStats[qId].ratings.reduce((a, b) => a + b, 0);
          stats.ratingStats[qId].average = (sum / stats.ratingStats[qId].ratings.length).toFixed(1);
        }
      } else if (question.type === 'one-word' && typeof answer === 'string') {
        stats.oneWordAnswers.push(answer);
      } else if (question.type === 'one-line' && typeof answer === 'string') {
        stats.oneLineAnswers.push(answer);
      }
    });
  });

  return stats;
}

function WordCloud({ words }) {
  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <p>No one-word answers yet</p>
      </div>
    );
  }

  const wordCounts = words.reduce((acc, word) => {
    const lower = word.toLowerCase();
    acc[lower] = (acc[lower] || 0) + 1;
    return acc;
  }, {});

  const uniqueWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const maxCount = Math.max(...uniqueWords.map(([, count]) => count));

  const getSize = (count) => {
    const ratio = count / maxCount;
    if (ratio > 0.75) return 'text-3xl';
    if (ratio > 0.5) return 'text-2xl';
    if (ratio > 0.25) return 'text-xl';
    return 'text-lg';
  };

  const getOpacity = (count) => {
    const ratio = count / maxCount;
    return 0.5 + ratio * 0.5;
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4 min-h-[150px]">
      {uniqueWords.map(([word, count]) => (
        <span
          key={word}
          className={`${getSize(count)} font-semibold capitalize px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full`}
          style={{ opacity: getOpacity(count) }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function MCQStats({ stats }) {
  const entries = Object.entries(stats).filter(([, s]) => s.total > 0);
  
  if (entries.length === 0) {
    return (
      <div className="text-center py-4 text-zinc-500">
        <p>No MCQ responses yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map(([qId, data]) => (
        <div key={qId} className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {data.question}
          </p>
          <div className="space-y-1">
            {data.options.map(option => {
              const count = data.counts[option] || 0;
              const percentage = data.total > 0 ? Math.round((count / data.total) * 100) : 0;
              
              return (
                <div key={option} className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{option}</span>
                    <span>{percentage}% ({count})</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function RatingStats({ stats }) {
  const entries = Object.entries(stats).filter(([, s]) => s.ratings.length > 0);
  
  if (entries.length === 0) {
    return (
      <div className="text-center py-4 text-zinc-500">
        <p>No rating responses yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {entries.map(([qId, data]) => (
        <div key={qId} className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 line-clamp-2">
            {data.question}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{data.average}</span>
            <span className="text-sm text-zinc-500">/ 10</span>
          </div>
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full ${
                  n <= Math.round(parseFloat(data.average))
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                    : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponseCard({ response, index }) {
  return (
    <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">
          {response.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-medium">{response.name || getRandomFillerName()}</p>
          <p className="text-xs text-zinc-500">{formatTimestamp(response.completedAt)}</p>
        </div>
      </div>
      <div className="space-y-2">
        {Object.entries(response.answers || {}).map(([qId, answer]) => (
          answer && (
            <div key={qId} className="flex gap-2 text-sm">
              <span className="text-zinc-400 shrink-0">•</span>
              <p className="text-zinc-600 dark:text-zinc-400">{answer}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function FloatingButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-8 right-8 px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform z-[9999] flex items-center gap-2"
    >
      Generate My Card
    </button>
  );
}

export default function ResultsPage() {
  const params = useParams();
  const bookId = params.id;
  
  const [book, setBook] = useState(null);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [cardRef, setCardRef] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    const unsubscribe = subscribeToBook(bookId, (data) => {
      setBook(data);
      if (data.responses) {
        setResponses(data.responses);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [bookId]);

  const stats = book?.questions ? calculateStats(responses, book.questions) : null;

  const handleGenerateCard = () => {
    const card = document.getElementById('card-preview');
    
    if (!card) {
      alert('Card not found');
      return;
    }
    
    setGenerating(true);
    
    html2canvas(card, {
      backgroundColor: '#1a1a1a',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then(canvas => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `spill-tea-card-${Date.now()}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 100);
        } else {
          alert('Failed to create image');
        }
        setGenerating(false);
      }, 'image/png');
    }).catch(error => {
      console.error('Error:', error);
      alert('Failed to generate card');
      setGenerating(false);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <p className="text-zinc-500">Loading Results...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Book not found</p>
          <p className="text-zinc-500">This slam book may have been deleted or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Navbar showBack />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">Results</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {stats?.totalResponses || 0} response{(stats?.totalResponses || 0) !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="flex gap-1">
              {['overview', 'responses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Stats Overview</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-center">
                    <p className="text-4xl font-bold">{stats.totalResponses}</p>
                    <p className="text-sm text-zinc-500 mt-1">Total Responses</p>
                  </div>
                  <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-center">
                    <p className="text-4xl font-bold">{book?.questions?.length || 0}</p>
                    <p className="text-sm text-zinc-500 mt-1">Questions</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold">One-Word Cloud</h3>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <WordCloud words={stats.oneWordAnswers} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold">One-Line Responses</h3>
                <div className="space-y-2">
                  {stats.oneLineAnswers.length > 0 ? (
                    stats.oneLineAnswers.slice(0, 10).map((answer, idx) => (
                      <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm">
                        <span className="text-zinc-400 mr-2">&ldquo;</span>
                        {answer}
                        <span className="text-zinc-400 ml-2">&rdquo;</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-zinc-500">No one-line responses yet</p>
                  )}
                  {stats.oneLineAnswers.length > 10 && (
                    <p className="text-center text-sm text-zinc-500">
                      + {stats.oneLineAnswers.length - 10} more responses
                    </p>
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold">Rating Averages</h3>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
                  <RatingStats stats={stats.ratingStats} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold">MCQ Breakdown</h3>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
                  <MCQStats stats={stats.mcqStats} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold">Card Preview</h3>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-4 flex justify-center">
                  <div 
                    id="card-preview"
                    className="w-[280px] h-[498px] rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 flex flex-col shadow-2xl"
                  >
                    <div className="text-center mb-6">
                      <p className="text-xs uppercase tracking-widest text-zinc-400">My friends think I am...</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                      {stats.oneWordAnswers.length > 0 ? (
                        [...new Set(stats.oneWordAnswers.map(w => w.toLowerCase()))]
                          .slice(0, 5)
                          .map((word, idx) => (
                            <p key={idx} className="text-2xl font-bold capitalize">{word}</p>
                          ))
                      ) : (
                        <p className="text-lg text-zinc-500">Share your slam book!</p>
                      )}
                    </div>
                    
                    <div className="text-center mt-auto">
                      <p className="text-xs text-zinc-500">spill.app</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'responses' && (
            <div className="space-y-4">
              {responses.length > 0 ? (
                responses.map((response, idx) => (
                  <ResponseCard key={idx} response={response} index={idx} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500">No responses yet</p>
                  <p className="text-sm text-zinc-400 mt-1">Share your link to get started!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <FloatingButton onClick={handleGenerateCard} />
      
      {generating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-2xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-zinc-300 border-t-black dark:border-t-white rounded-full animate-spin" />
            <span>Generating card...</span>
          </div>
        </div>
      )}
    </div>
  );
}
