# AI vs Human Challenge 🎯

An interactive web-based game where players determine whether a piece of content was created by a **Human** or an **Artificial Intelligence**. Test your instincts across multiple content types including text, images, code snippets, artwork, and voice clips while competing for the highest score.

## 🚀 Features

- 🧠 Guess whether content is AI-generated or human-created
- 🖼️ Multiple content types:
  - Images
  - Text
  - Code Snippets
  - Artwork
  - Voice Clips
- 🎲 Randomized, non-repeating questions each game
- 📈 Real-time scoring system
- 🔥 Accuracy and streak tracking
- ⏱️ Round timer
- 🏆 Local leaderboard
- 📊 End-game statistics
- 💡 Detailed explanation after every answer
- 🌙 Dark/Light mode
- 📱 Fully responsive design
- 🚪 Exit game with confirmation dialog

## 🛠️ Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- LocalStorage

## 📂 Project Structure

```
src/
│── assets/
│── components/
│── data/
│── hooks/
│── pages/
│── context/
│── types/
│── utils/
│── App.tsx
│── main.tsx
```

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/ai-vs-human-challenge.git
```

Navigate to the project

```bash
cd ai-vs-human-challenge
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

## 🎮 Gameplay

1. Start a new game.
2. Select a game mode and difficulty.
3. Analyze the displayed content.
4. Guess whether it was created by a Human or an AI.
5. View the correct answer along with an explanation.
6. Continue until all rounds are completed.
7. Check your final score and leaderboard ranking.

## 🏆 Scoring

- Correct Answer → +10 points
- Difficulty Bonus
  - Easy → +5
  - Medium → +10
  - Hard → +20

Statistics tracked include:

- Total Score
- Accuracy
- Current Streak
- Best Streak
- Correct Answers
- Incorrect Answers

## 💾 Data Persistence

The application uses LocalStorage to save:

- Leaderboard
- Player statistics
- Best score
- Theme preference
- User settings

## ✨ Highlights

- Modern responsive interface
- Smooth animations
- Randomized question order
- No repeated questions during a game
- Instant feedback after each answer
- Accessible and mobile-friendly design

## 🔮 Future Enhancements

- Multiplayer mode
- Global online leaderboard
- AI-generated daily challenges
- User-submitted questions
- Additional content categories
- Adaptive difficulty based on player performance
