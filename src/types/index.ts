export type ContentType = 'image' | 'text' | 'code' | 'voice' | 'artwork';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type AnswerType = 'Human' | 'AI';

export interface GameItem {
  id: string | number;
  type: ContentType;
  content: string; // URL for images/audio, text for text/code
  answer: AnswerType;
  explanation: string;
  difficulty: Difficulty;
  title?: string; // Optional title or context
}

export interface PlayerStats {
  name: string;
  score: number;
  accuracy: number;
  gamesPlayed: number;
  bestStreak: number;
  completionTime: number; // in seconds
  timestamp: number;
}

export type GameMode = 'Classic' | 'Endless' | 'Time Attack' | 'Mixed';

export interface GameSettings {
  darkMode: boolean;
  sound: boolean;
  animations: boolean;
  difficulty: Difficulty;
  gameMode: GameMode;
}
