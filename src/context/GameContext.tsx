import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { GameItem, PlayerStats, GameSettings, Difficulty, AnswerType } from '../types';
import { mockData } from '../data/mockData';
import { saveToLeaderboard, getSettings, saveSettings } from '../utils/storage';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  items: GameItem[];
  currentIndex: number;
  score: number;
  accuracy: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  bestStreak: number;
  gameState: 'start' | 'playing' | 'revealed' | 'end';
  setGameState: (state: 'start' | 'playing' | 'revealed' | 'end') => void;
  startGame: (name: string, diff: Difficulty) => void;
  exitGame: () => void;
  handleGuess: (guess: AnswerType) => void;
  nextRound: () => void;
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  currentItem: GameItem | null;
  selectedAnswer: AnswerType | null;
  timeRemaining: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerName, setPlayerName] = useState('');
  const [items, setItems] = useState<GameItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'revealed' | 'end'>('start');
  const [settings, setSettingsState] = useState<GameSettings>(getSettings());
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [startTime, setStartTime] = useState(Date.now());

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    saveSettings(updated);
  };

  const startGame = (name: string, diff: Difficulty) => {
    setPlayerName(name);
    
    // Filter by difficulty
    const filteredItems = mockData.filter(item => item.difficulty === diff);
    
    // Fisher-Yates shuffle
    const shuffled = [...filteredItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Select 10 unique items for Classic mode
    setItems(shuffled.slice(0, 10));
    
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setGameState('playing');
    setSelectedAnswer(null);
    setTimeRemaining(30);
    setStartTime(Date.now());
  };

  const exitGame = () => {
    setGameState('start');
    setItems([]);
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCurrentStreak(0);
    setSelectedAnswer(null);
    setTimeRemaining(30);
  };

  const handleGuess = (guess: AnswerType) => {
    if (gameState !== 'playing') return;
    
    setSelectedAnswer(guess);
    const currentItem = items[currentIndex];
    const isCorrect = guess === currentItem.answer;
    
    if (isCorrect) {
      const difficultyBonus = currentItem.difficulty === 'Easy' ? 5 : currentItem.difficulty === 'Medium' ? 10 : 20;
      setScore(prev => prev + 10 + difficultyBonus);
      setCorrectAnswers(prev => prev + 1);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setWrongAnswers(prev => prev + 1);
      setCurrentStreak(0);
    }
    
    setGameState('revealed');
  };

  const nextRound = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setGameState('playing');
      setSelectedAnswer(null);
      setTimeRemaining(30);
    } else {
      setGameState('end');
      const totalAnswers = correctAnswers + wrongAnswers;
      const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
      saveToLeaderboard({
        name: playerName,
        score,
        accuracy,
        gamesPlayed: 1,
        bestStreak,
        completionTime: Math.floor((Date.now() - startTime) / 1000),
        timestamp: Date.now()
      });
    }
  };

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeRemaining === 0) {
      // Auto-reveal if timeout
      setSelectedAnswer(null); // No guess
      setWrongAnswers(prev => prev + 1);
      setCurrentStreak(0);
      setGameState('revealed');
    }
  }, [gameState, timeRemaining]);

  const currentItem = items.length > 0 ? items[currentIndex] : null;
  const totalAnswers = correctAnswers + wrongAnswers;
  const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

  return (
    <GameContext.Provider value={{
      playerName, setPlayerName,
      items, currentIndex, score, accuracy, correctAnswers, wrongAnswers,
      currentStreak, bestStreak, gameState, setGameState, startGame, exitGame, handleGuess, nextRound,
      settings, updateSettings, currentItem, selectedAnswer, timeRemaining
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
