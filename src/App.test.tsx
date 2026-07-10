import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders Hero component on start', () => {
    render(<App />)
    expect(screen.getByText(/Can you outsmart/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Enter your name to start/i),
    ).toBeInTheDocument()
  })

  it('allows user to type name and start game', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Enter your name to start/i)
    fireEvent.change(input, { target: { value: 'Player 1' } })
    expect(input).toHaveValue('Player 1')

    const startButton = screen.getByRole('button', { name: /Start Challenge/i })
    fireEvent.click(startButton)

    // After starting, it should render ScoreBoard (Score label)
    await waitFor(
      () => {
        expect(screen.getByText(/Score/i)).toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })
})
