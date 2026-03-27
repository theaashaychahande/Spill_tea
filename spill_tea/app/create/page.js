'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { categories, getQuestionsByCategory } from '../../lib/questions';
import { generateId } from '../../lib/firebase';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [customQuestions, setCustomQuestions] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setQuestions(getQuestionsByCategory(categoryId));
    setStep(2);
  };

  const handleCustomQuestionChange = (index, value) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const bookId = generateId();
    const allQuestions = [...questions];
    customQuestions.forEach(q => {
      if (q.trim()) {
        allQuestions.push({
          id: `custom-${Date.now()}-${Math.random()}`,
          question: q.trim(),
          type: 'one-line'
        });
      }
    });

    const bookData = {
      id: bookId,
      category: selectedCategory,
      questions: allQuestions,
      anonymousMode,
      createdAt: new Date().toISOString(),
    };

    console.log('Book created:', bookData);
    router.push(`/results/${bookId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBack />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg mx-auto">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Create Your Slam Book</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Choose a category that fits your vibe
                </p>
              </div>

              <div className="space-y-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full p-6 text-left rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{category.emoji}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Customize</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Add up to 3 custom questions (optional)
                </p>
              </div>

              <div className="space-y-4">
                {customQuestions.map((q, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={q}
                    onChange={(e) => handleCustomQuestionChange(idx, e.target.value)}
                    placeholder={`Custom question ${idx + 1}...`}
                    className="w-full px-4 py-3 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:border-black dark:focus:border-white outline-none"
                    maxLength={100}
                  />
                ))}
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 space-y-3">
                <h3 className="font-semibold">Settings</h3>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Anonymous responses</span>
                  <button
                    onClick={() => setAnonymousMode(!anonymousMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      anonymousMode ? 'bg-black dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white dark:bg-black rounded-full transition-transform ${
                        anonymousMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Generate My Slam Book'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
