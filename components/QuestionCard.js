'use client';

import { useState } from 'react';

const emojiOptions = ['😄', '🙂', '😐', '😕', '😢', '🤔', '😍', '😎'];

export default function QuestionCard({ question, onAnswer, isSaving }) {
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    let finalAnswer = answer;

    if (question.type === 'mcq' && selectedOption !== null) {
      finalAnswer = question.options[selectedOption];
    } else if (question.type === 'rating') {
      finalAnswer = rating.toString();
    } else if (question.type === 'emoji' && answer) {
      finalAnswer = answer;
    }

    if (finalAnswer && finalAnswer.trim()) {
      onAnswer(finalAnswer);
    }
  };

  const getCharLimit = () => {
    if (question.type === 'one-word') return 30;
    if (question.type === 'one-line') return 80;
    return 200;
  };

  const canSubmit = () => {
    if (question.type === 'mcq') return selectedOption !== null;
    if (question.type === 'rating') return true;
    if (question.type === 'emoji') return !!answer;
    return answer.trim().length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {question.type === 'one-word' && (
          <div className="relative">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, getCharLimit()))}
              placeholder="Type your answer..."
              autoFocus
              className="w-full px-5 py-4 text-xl border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 focus:border-black dark:focus:border-white outline-none transition-all text-center font-medium placeholder:text-zinc-400"
              maxLength={getCharLimit()}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
              {answer.length}/{getCharLimit()}
            </div>
          </div>
        )}

        {question.type === 'one-line' && (
          <div className="relative">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, getCharLimit()))}
              placeholder="Your answer..."
              autoFocus
              className="w-full px-5 py-4 text-lg border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 focus:border-black dark:focus:border-white outline-none transition-all placeholder:text-zinc-400"
              maxLength={getCharLimit()}
            />
            <div className="mt-2 text-right text-xs text-zinc-400">
              {answer.length}/{getCharLimit()}
            </div>
          </div>
        )}

        {question.type === 'mcq' && question.options && (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`p-4 text-left rounded-2xl border-2 transition-all active:scale-[0.98] ${
                  selectedOption === idx
                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50 dark:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === idx
                      ? 'border-white dark:border-black'
                      : 'border-zinc-300 dark:border-zinc-600'
                  }`}>
                    {selectedOption === idx && (
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        selectedOption === idx
                          ? 'bg-white dark:bg-black'
                          : ''
                      }`} />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === 'rating' && (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-zinc-500">Min</span>
              <div className="text-center">
                <span className="text-5xl font-bold">{rating}</span>
                <p className="text-xs text-zinc-400 mt-1">out of 10</p>
              </div>
              <span className="text-sm text-zinc-500">Max</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, black dark:white ${(rating - 1) * 11.11}%, #e5e5e5 ${(rating - 1) * 11.11}%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-zinc-400">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className={rating === i + 1 ? 'font-bold text-black dark:text-white' : ''}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {question.type === 'emoji' && (
          <div className="flex justify-center gap-4 py-4">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setAnswer(emoji)}
                className={`text-4xl p-3 rounded-2xl transition-all active:scale-90 ${
                  answer === emoji
                    ? 'bg-zinc-100 dark:bg-zinc-800 scale-110 shadow-lg'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit() || isSaving}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${
          canSubmit()
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-xl'
            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
        }`}
      >
        {isSaving ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </span>
        ) : (
          'Next'
        )}
      </button>
    </div>
  );
}
