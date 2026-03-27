'use client';

import { useState } from 'react';

export default function QuestionCard({ question, onAnswer, currentIndex, totalQuestions }) {
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    let finalAnswer = answer;
    
    if (question.type === 'mcq' && selectedOption !== null) {
      finalAnswer = question.options[selectedOption];
    } else if (question.type === 'rating') {
      finalAnswer = rating.toString();
    }
    
    onAnswer(finalAnswer);
    setAnswer('');
    setSelectedOption(null);
    setRating(5);
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black dark:bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.type === 'one-word' && (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.slice(0, 30))}
            placeholder="One word answer..."
            className="w-full px-4 py-3 text-lg border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:border-black dark:focus:border-white outline-none transition-colors"
            maxLength={30}
          />
        )}

        {question.type === 'one-line' && (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.slice(0, 80))}
            placeholder="Your answer..."
            className="w-full px-4 py-3 text-lg border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-transparent focus:border-black dark:focus:border-white outline-none transition-colors"
            maxLength={80}
          />
        )}

        {question.type === 'mcq' && question.options && (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${
                  selectedOption === idx
                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'rating' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">1</span>
              <span className="text-3xl font-bold">{rating}</span>
              <span className="text-sm text-zinc-500">10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>
        )}

        {question.type === 'emoji' && (
          <div className="flex justify-center gap-4">
            {['😄', '🙂', '😐', '😕', '😢'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  setAnswer(emoji);
                }}
                className={`text-4xl p-3 rounded-full transition-transform hover:scale-110 ${
                  answer === emoji ? 'bg-zinc-100 dark:bg-zinc-800' : ''
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
        disabled={
          (question.type === 'one-word' || question.type === 'one-line') && !answer.trim() ||
          question.type === 'mcq' && selectedOption === null
        }
        className="w-full mt-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Next
      </button>
    </div>
  );
}
