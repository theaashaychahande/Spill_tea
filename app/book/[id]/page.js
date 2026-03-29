'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import QuestionCard from '../../../components/QuestionCard';
import { getBook, saveResponse } from '../../../lib/firebase';

function generateConfettiPieces() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));
}

function Confetti() {
  const confettiPieces = useMemo(() => generateConfettiPieces(), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: piece.id % 2 === 0 ? '50%' : '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function FillBookPage() {
  const params = useParams();
  const bookId = params.id;

  const [book, setBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [fillerName, setFillerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await getBook(bookId);
        if (data) {
          setBook(data);
          setShowNameInput(!data.anonymousMode);
        }
      } catch (error) {
        console.error('Error loading book:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (bookId) loadBook();
  }, [bookId]);

  const handleStartWithName = useCallback(() => {
    if (fillerName.trim()) {
      setIsStarted(true);
    }
  }, [fillerName]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !showNameInput && !isStarted) {
      handleStartWithName();
    }
  }, [showNameInput, isStarted, handleStartWithName]);

  useEffect(() => {
    if (showNameInput) {
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }
  }, [showNameInput, handleKeyPress]);

  const handleAnswer = useCallback(async (answer) => {
    const questionId = book.questions[currentIndex].id;
    const newResponses = { ...responses, [questionId]: answer };
    setResponses(newResponses);

    if (currentIndex < book.questions.length - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSaving(true);
      try {
        const responseData = {
          name: fillerName || 'Anonymous',
          answers: newResponses,
          completedAt: new Date().toISOString(),
        };
        await saveResponse(bookId, responseData);
        setIsComplete(true);
      } catch (error) {
        console.error('Error saving response:', error);
        alert('Failed to save your answers. Please try again.');
        setIsSaving(false);
      }
    }
  }, [book, currentIndex, responses, fillerName, bookId]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-black dark:border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-zinc-500">Loading slam book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar showBack />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">😕</div>
            <h1 className="text-2xl font-bold">Book not found</h1>
            <p className="text-zinc-500">This slam book may have expired or been deleted.</p>
          </div>
        </div>
      </div>
    );
  }

  if (showNameInput && !isStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl">
                📝
              </div>
              <h1 className="text-2xl font-bold">Who&apos;s filling this?</h1>
              <p className="text-zinc-500">
                Let them know who&apos;s spilling the tea
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={fillerName}
                onChange={(e) => setFillerName(e.target.value)}
                placeholder="Your name"
                autoFocus
                className="w-full px-6 py-4 text-xl text-center border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 focus:border-black dark:focus:border-white outline-none transition-colors"
                maxLength={30}
              />
              <button
                onClick={handleStartWithName}
                disabled={!fillerName.trim()}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black relative overflow-hidden">
        <Confetti />
        <div className="relative z-10 text-center space-y-6 px-6 animate-in fade-in zoom-in duration-500">
          <div className="space-y-2">
            <div className="text-7xl">🎉</div>
            <h1 className="text-4xl font-bold">All done!</h1>
            <p className="text-xl text-zinc-500">
              Thanks for spilling the tea!
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 inline-block">
            <p className="text-sm text-zinc-500">Sent as</p>
            <p className="font-semibold text-lg">
              {fillerName || 'Anonymous'}
            </p>
          </div>
          <button
            onClick={() => window.close()}
            className="block w-full py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = book.questions[currentIndex];
  const progress = ((currentIndex + 1) / book.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="h-1 bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Navbar showBack />

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-6">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`p-2 -ml-2 rounded-full ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-medium">
              {currentIndex + 1} / {book.questions.length}
            </span>
            <div className="w-9" />
          </div>

          <div
            key={currentQuestion.id}
            className={`animate-in slide-in-from-right-4 fade-in duration-300 ${
              direction === 'prev' ? 'animate-in slide-in-from-left-4' : ''
            }`}
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 mb-3">
                {currentQuestion.type === 'mcq' && 'Choose one'}
                {currentQuestion.type === 'one-word' && 'One word'}
                {currentQuestion.type === 'one-line' && 'Short answer'}
                {currentQuestion.type === 'rating' && 'Rate it'}
                {currentQuestion.type === 'emoji' && 'Pick one'}
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              isSaving={isSaving}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
