import { test, expect } from "@playwright/test";
import { GamePage } from '../pages/game';
import './setup';

test('Play game', async ({ page }) => {
    const game = new GamePage(page);
    await game.openGame();
    const initialBalance = await game.getGameBalance();
    const bet = await game.getBetValue();
    const result = await game.clickRandomCat();
    let expectedBalance: number;
    if (result === 'loss') {
        expectedBalance = initialBalance - bet;
    } else {
        expectedBalance = initialBalance + result - bet;
    }
    await page.waitForTimeout(1500)
    const newGameBalance = await game.getGameBalance();
    await expect(expectedBalance).toEqual(newGameBalance);
});
