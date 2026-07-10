import React from 'react'
import { useGame } from '../context/GameContext'
import { Trophy, Target, Flame, Timer } from 'lucide-react'
import { motion } from 'framer-motion'

export const ScoreBoard: React.FC = () => {
  const {
    score,
    accuracy,
    currentStreak,
    bestStreak,
    currentIndex,
    items,
    timeRemaining,
  } = useGame()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<Trophy className="text-yellow-500" />}
        label="Score"
        value={score.toString()}
      />
      <StatCard
        icon={<Target className="text-blue-500" />}
        label="Accuracy"
        value={`${Math.round(accuracy)}%`}
      />
      <StatCard
        icon={<Flame className="text-orange-500" />}
        label="Streak"
        value={`${currentStreak} (Best: ${bestStreak})`}
      />
      <StatCard
        icon={
          <Timer
            className={
              timeRemaining < 10
                ? 'text-red-500 animate-pulse'
                : 'text-green-500'
            }
          />
        }
        label={`Round ${currentIndex + 1}/${items.length}`}
        value={`00:${timeRemaining.toString().padStart(2, '0')}`}
      />
    </div>
  )
}

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) => (
  <div className="glassmorphism p-4 rounded-2xl flex items-center gap-4">
    <div className="p-3 bg-foreground/5 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <motion.p
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl font-bold"
      >
        {value}
      </motion.p>
    </div>
  </div>
)
