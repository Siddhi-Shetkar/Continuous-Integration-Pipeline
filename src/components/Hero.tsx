import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import type { Difficulty } from '../types'
import { PlayCircle, ShieldAlert, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export const Hero: React.FC = () => {
  const { startGame } = useGame()
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium')

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      startGame(name.trim(), difficulty)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl glassmorphism rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight relative z-10">
          Can you outsmart <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            the AI?
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto relative z-10">
          Test your intuition. Analyze texts, code, images, and voice clips to
          distinguish human creativity from machine generation.
        </p>

        <form
          onSubmit={handleStart}
          className="space-y-6 relative z-10 max-w-md mx-auto"
        >
          <div>
            <input
              type="text"
              placeholder="Enter your name to start"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 text-lg focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-sm"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <DifficultyBtn
              level="Easy"
              current={difficulty}
              set={setDifficulty}
              icon={<Sparkles size={18} />}
              color="text-green-500"
            />
            <DifficultyBtn
              level="Medium"
              current={difficulty}
              set={setDifficulty}
              icon={<Zap size={18} />}
              color="text-yellow-500"
            />
            <DifficultyBtn
              level="Hard"
              current={difficulty}
              set={setDifficulty}
              icon={<ShieldAlert size={18} />}
              color="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
          >
            <PlayCircle size={28} />
            Start Challenge
          </button>
        </form>
      </motion.div>
    </div>
  )
}

const DifficultyBtn = ({
  level,
  current,
  set,
  icon,
  color,
}: {
  level: Difficulty
  current: Difficulty
  set: (l: Difficulty) => void
  icon: React.ReactNode
  color: string
}) => (
  <button
    type="button"
    onClick={() => set(level)}
    className={`py-3 px-2 flex flex-col items-center gap-2 rounded-xl border-2 transition-all ${
      current === level
        ? 'border-primary bg-primary/10 scale-105'
        : 'border-transparent bg-foreground/5 hover:bg-foreground/10'
    }`}
  >
    <div className={color}>{icon}</div>
    <span className="font-semibold text-sm">{level}</span>
  </button>
)
