import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';
import {BalancePage} from "../pages/balance";

test('Authorization positive test', async ({ page }) => {
    const account = new AccountPage(page);;
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('ansh120022@gmail.com');
    const balancePage = new BalancePage(page)
    const balanceButton = await balancePage.getBalanceButtonLocator()
    await expect(balanceButton).toBeVisible();
});