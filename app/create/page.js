'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { categories, getCategoryById } from '../../lib/questions';
import { generateId, saveBook } from '../../lib/firebase';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [customQuestions, setCustomQuestions] = useState(['', '', '']);
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [createdBookId, setCreatedBookId] = useState(null);

  const handleCategorySelect = (categoryId) => {
    const category = getCategoryById(categoryId);
    setSelectedCategory(category);
    setQuestions(category.questions);
    setStep(2);
  };

  const handleNextToCustom = () => {
    setStep(3);
  };

  const handleCustomQuestionChange = (index, value) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  const handleNextToSettings = () => {
    setStep(4);
  };

  const handleNextToGenerate = () => {
    setStep(5);
  };

  const getAllQuestions = () => {
    const allQuestions = [...questions];
    customQuestions.forEach((q, idx) => {
      if (q.trim()) {
        allQuestions.push({
          id: `custom-${Date.now()}-${idx}`,
          question: q.trim(),
          type: 'one-line',
        });
      }
    });
    return allQuestions;
  };

  const handleCreate = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const bookId = generateId();
    const allQuestions = getAllQuestions();

    const bookData = {
      id: bookId,
      creatorId: `user-${Date.now()}`,
      category: selectedCategory.id,
      questions: allQuestions,
      anonymousMode,
      createdAt: new Date().toISOString(),
      responses: [],
    };

    try {
      await saveBook(bookData);
      setCreatedBookId(bookId);
      setStep(6);
    } catch (error) {
      console.error('Failed to create book:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/book/${createdBookId}`
    : `/book/${createdBookId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const handleShareWhatsApp = () => {
    const text = `Fill out my slam book! ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBack />

      <main className="flex-1 px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Create Your Slam Book</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Choose a category that fits your vibe
                </p>
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full p-5 text-left rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{category.emoji}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
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
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <span className="text-sm text-zinc-500">Step 1 of 4</span>
                <h1 className="text-2xl font-bold">{selectedCategory?.emoji} {selectedCategory?.name}</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Here are 15 questions for your category
                </p>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-left"
                  >
                    <p className="text-sm font-medium text-zinc-500 mb-1">Q{idx + 1}</p>
                    <p className="font-medium">{q.question}</p>
                    {q.type === 'mcq' && q.options && (
                      <p className="text-xs text-zinc-500 mt-1">
                        Options: {q.options.join(' / ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Back
                </button>
                <button
                  onClick={handleNextToCustom}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <span className="text-sm text-zinc-500">Step 2 of 4</span>
                <h1 className="text-2xl font-bold">Add Custom Questions</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Add up to 3 questions (optional)
                </p>
              </div>

              <div className="space-y-3">
                {customQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-sm font-medium text-zinc-500">
                      Custom question {idx + 1}
                    </label>
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => handleCustomQuestionChange(idx, e.target.value)}
                      placeholder={`e.g., What's your favorite memory with me?`}
                      className="w-full px-4 py-3 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:border-black dark:focus:border-white outline-none transition-colors"
                      maxLength={100}
                    />
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {getAllQuestions().length} questions total
                  {customQuestions.filter(q => q.trim()).length > 0 && (
                    <span className="text-black dark:text-white font-medium ml-1">
                      (+{customQuestions.filter(q => q.trim()).length} custom)
                    </span>
                  )}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Back
                </button>
                <button
                  onClick={handleNextToSettings}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <span className="text-sm text-zinc-500">Step 3 of 4</span>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Configure how respondents answer
                </p>
              </div>

              <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-semibold">Anonymous Mode</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Hide who answered each question
                    </p>
                  </div>
                  <button
                    onClick={() => setAnonymousMode(!anonymousMode)}
                    className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ${
                      anonymousMode ? 'bg-black dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow transition-transform ${
                        anonymousMode ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 space-y-3">
                <p className="font-semibold">Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Category</span>
                    <span className="font-medium">{selectedCategory?.emoji} {selectedCategory?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Preset Questions</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Custom Questions</span>
                    <span className="font-medium">{customQuestions.filter(q => q.trim()).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Total Questions</span>
                    <span className="font-medium">{getAllQuestions().length}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Back
                </button>
                <button
                  onClick={handleNextToGenerate}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <span className="text-sm text-zinc-500">Step 4 of 4</span>
                <h1 className="text-2xl font-bold">Ready to Go?</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Your slam book is all set!
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-black dark:bg-white flex items-center justify-center">
                    <span className="text-3xl">{selectedCategory?.emoji}</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{selectedCategory?.name} Slam Book</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {getAllQuestions().length} questions
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${anonymousMode ? 'bg-green-500' : 'bg-zinc-400'}`} />
                    <p className="text-sm">
                      {anonymousMode ? 'Anonymous' : 'Named'} responses
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold active:scale-[0.98] transition-transform"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    'Generate My Slam Book'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold">Slam Book Created!</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Share it with your friends
                </p>
              </div>

              <div className="p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 mb-2">Your unique link</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-sm truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => router.push(`/results/${createdBookId}`)}
                  className="w-full py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-full font-semibold active:scale-[0.98] transition-transform"
                >
                  View Results
                </button>
              </div>

              <button
                onClick={() => router.push('/')}
                className="w-full py-3 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                Create another slam book
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
