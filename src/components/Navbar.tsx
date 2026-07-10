import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Bot, Moon, Sun, Settings, BarChart2, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, updateSettings, gameState, exitGame } = useGame();
  const [showExitModal, setShowExitModal] = useState(false);

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    exitGame();
  };

  const isGameActive = gameState === 'playing' || gameState === 'revealed';

  return (
    <>
      <nav className="w-full py-4 px-6 sm:px-12 flex justify-between items-center glassmorphism sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground">
            <Bot size={28} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold hidden sm:block tracking-tight">
            AI vs Human <span className="text-primary">Challenge</span>
          </h1>
        </div>

        <div className="flex gap-4">
          {!isGameActive && (
            <button className="p-2 rounded-full hover:bg-foreground/10 transition-colors">
              <BarChart2 size={24} />
            </button>
          )}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
          >
            {settings.darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          {isGameActive ? (
            <button 
              onClick={() => setShowExitModal(true)}
              className="p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-colors"
              title="Exit Game"
            >
              <LogOut size={24} />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-foreground/10 transition-colors">
              <Settings size={24} />
            </button>
          )}
        </div>
      </nav>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background border border-border p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Exit Game?</h3>
            <p className="text-muted-foreground mb-8">
              Are you sure you want to exit the current game? Your progress will be lost.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleExitConfirm}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
