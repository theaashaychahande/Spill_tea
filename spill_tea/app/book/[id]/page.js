'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import QuestionCard from '../../../components/QuestionCard';

const mockBook = {
  category: 'friends',
  anonymousMode: false,
  questions: [
    { id: 'f1', question: "If I was a snack, I'd be...", type: 'one-word' },
    { id: 'f2', question: "Honestly, my vibe is more...", type: 'mcq', options: ['Night owl', 'Morning chaos'] },
    { id: 'f3', question: "Rate my rizz out of 10", type: 'rating' },
    { id: 'f4', question: "I would survive a zombie apocalypse...", type: 'mcq', options: ['Absolutely', 'First to go', 'Depends on mood'] },
    { id: 'f5', question: "The one thing I'm lowkey delusional about", type: 'one-line' },
    { id: 'f6', question: "My biggest red flag is...", type: 'one-word' },
    { id: 'f7', question: "If my life was a movie genre it'd be", type: 'mcq', options: ['Rom-com', 'Horror', 'Documentary', 'Chaos'] },
    { id: 'f8', question: "Am I the main character or side character energy?", type: 'mcq', options: ['Main character', 'Side character', 'Villain arc'] },
    { id: 'f9', question: "One word that is literally just... me", type: 'one-word' },
    { id: 'f10', question: "My toxic trait in a friendship is...", type: 'one-line' },
  ],
};

export default function FillBookPage() {
  const params = useParams();
  const bookId = params.id;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [fillerName, setFillerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(!mockBook.anonymousMode);
  const [isComplete, setIsComplete] = useState(false);
  const [book] = useState({ ...mockBook, id: bookId });

  const handleAnswer = (answer) => {
    const questionId = book.questions[currentIndex].id;
    setResponses((prev) => ({ ...prev, [questionId]: answer }));

    if (currentIndex < book.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmitWithName = () => {
    if (fillerName.trim()) {
      setShowNameInput(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar showBack />
        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Before you start</h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Let them know who&apos;s filling this out
              </p>
            </div>
            <input
              type="text"
              value={fillerName}
              onChange={(e) => setFillerName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 text-lg border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:border-black dark:focus:border-white outline-none text-center"
            />
            <button
              onClick={handleSubmitWithName}
              disabled={!fillerName.trim()}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full disabled:opacity-50"
            >
              Start Filling
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">All done!</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Thanks for spilling the tea!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBack />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <QuestionCard
          question={book.questions[currentIndex]}
          onAnswer={handleAnswer}
          currentIndex={currentIndex}
          totalQuestions={book.questions.length}
        />
      </main>
    </div>
  );
}
