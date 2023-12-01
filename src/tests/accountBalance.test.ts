import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';
import {BalancePage} from "../pages/balance";

test('Top up balance', async ({ page }) => {
    const balance = new BalancePage(page);
    const account = new AccountPage(page);
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('ansh120022@gmail.com');
    const balancePage = new BalancePage(page)
    const initialBalance= await balancePage.getBalanceValue();
    await balance.topUp();
    const newBalance = await balancePage.getBalanceValue();
    expect (newBalance).toBeGreaterThan(initialBalance);
});
