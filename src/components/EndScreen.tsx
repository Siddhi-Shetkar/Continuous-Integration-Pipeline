import React from 'react';
import { useGame } from '../context/GameContext';
import { getLeaderboard, clearLeaderboard } from '../utils/storage';
import { Trophy, RefreshCw, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EndScreen: React.FC = () => {
  const { score, accuracy, bestStreak, setGameState, playerName } = useGame();
  const leaderboard = getLeaderboard();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Result Card */}
      <div className="glassmorphism rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-600"></div>
        <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
        <h2 className="text-4xl font-extrabold mb-2">Game Over, {playerName}!</h2>
        <p className="text-xl text-muted-foreground mb-8">Here is how you performed:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ResultStat label="Final Score" value={score} color="text-yellow-500" />
          <ResultStat label="Accuracy" value={`${Math.round(accuracy)}%`} color="text-blue-500" />
          <ResultStat label="Best Streak" value={bestStreak} color="text-orange-500" />
        </div>

        <button 
          onClick={() => setGameState('start')}
          className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto"
        >
          <RefreshCw size={24} /> Play Again
        </button>
      </div>

      {/* Leaderboard */}
      <div className="glassmorphism rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="text-yellow-500" /> Top Detectives
          </h3>
          <button 
            onClick={() => {
              clearLeaderboard();
              window.location.reload();
            }}
            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
            title="Clear Leaderboard"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {leaderboard.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No scores yet. Be the first!</p>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className={`flex justify-between items-center p-4 rounded-2xl ${
                  idx === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' : 
                  idx === 1 ? 'bg-gray-400/10 border border-gray-400/30' : 
                  idx === 2 ? 'bg-orange-500/10 border border-orange-500/30' : 
                  'bg-foreground/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold w-6 text-center text-muted-foreground">#{idx + 1}</span>
                  <span className="font-bold text-lg">{entry.name}</span>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block text-sm text-muted-foreground">
                    <div>{Math.round(entry.accuracy)}% Acc</div>
                    <div>Streak: {entry.bestStreak}</div>
                  </div>
                  <span className="text-2xl font-black text-primary">{entry.score} pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

const ResultStat = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-foreground/5 p-6 rounded-2xl">
    <p className="text-muted-foreground mb-2 font-medium">{label}</p>
    <p className={`text-4xl font-black ${color}`}>{value}</p>
  </div>
);
