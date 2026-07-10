import type { PlayerStats, GameSettings } from '../types'

export const getLeaderboard = (): PlayerStats[] => {
  const data = localStorage.getItem('ai_human_leaderboard')
  return data ? JSON.parse(data) : []
}

export const saveToLeaderboard = (playerStats: PlayerStats) => {
  const leaderboard = getLeaderboard()
  leaderboard.push(playerStats)
  leaderboard.sort((a, b) => b.score - a.score) // Sort by highest score
  const top10 = leaderboard.slice(0, 10)
  localStorage.setItem('ai_human_leaderboard', JSON.stringify(top10))
}

export const clearLeaderboard = () => {
  localStorage.removeItem('ai_human_leaderboard')
}

export const getSettings = (): GameSettings => {
  const data = localStorage.getItem('ai_human_settings')
  return data
    ? JSON.parse(data)
    : {
        darkMode: true,
        sound: true,
        animations: true,
        difficulty: 'Medium',
        gameMode: 'Classic',
      }
}

export const saveSettings = (settings: GameSettings) => {
  localStorage.setItem('ai_human_settings', JSON.stringify(settings))
}
