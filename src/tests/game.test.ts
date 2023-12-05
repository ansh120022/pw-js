import { test, expect } from '@playwright/test'
import { GamePage } from '../pages/game'
import './setup'

test('Play game', async ({ page }) => {
  const game = new GamePage(page)
  await game.openGame()
  const initialBalance = await game.getGameBalance()
  const bet = await game.getBetValue()
  const result = await game.clickRandomCat()
  let expectedBalance: number
  if (result === 'loss') {
    expectedBalance = initialBalance - bet
  } else {
    expectedBalance = initialBalance + result - bet
  }
  await expect(async () => {
    const newBalance = await game.getGameBalance()
    expect(newBalance, 'Check that balance increased/decreased according to game result').toEqual(expectedBalance)
  }).toPass()
})
