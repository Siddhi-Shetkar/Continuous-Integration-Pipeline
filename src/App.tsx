import { useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameCard } from './components/GameCard';
import { ScoreBoard } from './components/ScoreBoard';
import { EndScreen } from './components/EndScreen';
import { motion, AnimatePresence } from 'framer-motion';

const GameContent = () => {
  const { gameState, settings } = useGame();

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden font-sans selection:bg-primary/30">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                <Hero />
              </motion.div>
            )}

            {(gameState === 'playing' || gameState === 'revealed') && (
              <motion.div key="playing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-5xl mx-auto">
                <ScoreBoard />
                <GameCard />
              </motion.div>
            )}

            {gameState === 'end' && (
              <motion.div key="end" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full">
                <EndScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
