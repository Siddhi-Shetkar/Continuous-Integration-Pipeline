import React from 'react'
import { useGame } from '../context/GameContext'
import { ItemViewer } from './Viewers'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, BrainCircuit, User } from 'lucide-react'
import { cn } from '../utils/cn'

export const GameCard: React.FC = () => {
  const { currentItem, handleGuess, gameState, selectedAnswer, nextRound } =
    useGame()

  if (!currentItem) return null

  const isRevealed = gameState === 'revealed'
  const isCorrect = selectedAnswer === currentItem.answer

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {/* Viewer Section */}
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glassmorphism rounded-3xl p-4 md:p-8 relative"
      >
        <div className="mb-4 flex justify-between items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            {currentItem.type}
          </span>
          <span
            className={cn(
              'px-3 py-1 rounded-full border',
              currentItem.difficulty === 'Easy'
                ? 'border-green-500/50 text-green-500'
                : currentItem.difficulty === 'Medium'
                  ? 'border-yellow-500/50 text-yellow-500'
                  : 'border-red-500/50 text-red-500',
            )}
          >
            {currentItem.difficulty}
          </span>
        </div>

        <ItemViewer item={currentItem} />
      </motion.div>

      {/* Action/Result Section */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="guessing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4 md:gap-8"
            >
              <button
                onClick={() => handleGuess('Human')}
                className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-blue-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                <User size={64} className="mb-4 text-blue-500" />
                <span className="text-2xl font-bold">HUMAN</span>
              </button>

              <button
                onClick={() => handleGuess('AI')}
                className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-purple-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
                <BrainCircuit size={64} className="mb-4 text-purple-500" />
                <span className="text-2xl font-bold">AI</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'p-8 rounded-3xl shadow-2xl border-2 flex flex-col md:flex-row gap-8 items-center',
                isCorrect
                  ? 'bg-green-500/10 border-green-500 dark:border-green-400'
                  : 'bg-red-500/10 border-red-500 dark:border-red-400',
              )}
            >
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <CheckCircle2 size={80} className="text-green-500" />
                ) : (
                  <XCircle size={80} className="text-red-500" />
                )}
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3
                  className={cn(
                    'text-3xl font-bold mb-2',
                    isCorrect
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400',
                  )}
                >
                  {isCorrect ? 'Correct!' : 'Wrong!'}
                </h3>
                <p className="text-xl mb-4">
                  This was created by{' '}
                  <strong className="font-bold">
                    {currentItem.answer === 'AI' ? 'an AI' : 'a Human'}
                  </strong>
                  .
                </p>
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl text-sm md:text-base border border-black/5 dark:border-white/5">
                  <span className="font-semibold text-primary mb-1 block">
                    Explanation:
                  </span>
                  {currentItem.explanation}
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={nextRound}
                  className="w-full md:w-auto px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Next Round →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
