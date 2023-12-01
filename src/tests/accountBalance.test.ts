import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';
import {BalancePage} from "../pages/balance";

test('Top up balance', async ({ page }) => {
    const balance = new BalancePage(page);
    const account = new AccountPage(page);
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('ansh120022@gmail.com');
    const balancePage = new BalancePage(page);
    const initialBalance = await balancePage.getBalanceValue();
    await balance.topUp();
    const timeout = 4000;
    const pollInterval = 100;
    let elapsedTime = 0;
    while (elapsedTime < timeout) {
        const newBalance = await balancePage.getBalanceValue();

        if (newBalance > initialBalance) {
            break;
        }

        await page.waitForTimeout(pollInterval);
        elapsedTime += pollInterval;
    }
    const finalBalance = await balancePage.getBalanceValue();
    await expect(finalBalance).toBeGreaterThan(initialBalance);
});


