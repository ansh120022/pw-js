import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';
import {BalancePage} from "../pages/balance";
import {BrowserDialog} from "../pages/dialog";

test('Authorization positive test', async ({ page }) => {
    const account = new AccountPage(page);
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('ansh120022@gmail.com');
    const balancePage = new BalancePage(page)
    const balanceButton = await balancePage.getBalanceButtonLocator()
    await expect(balanceButton).toBeVisible();
});

test('Authorization negative test', async ({ page }) => {
    const account = new AccountPage(page);
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('this_user_do_not_exist@gmail.com');
    const dialog = new BrowserDialog(page);
    await dialog.acceptExpectedDialog("Sorry, we could not log you in. Check your email to make sure it´s spelled correctly.")
    const balancePage = new BalancePage(page)
    const balanceButton = await balancePage.getBalanceButtonLocator()
    await expect(balanceButton).toBeHidden();
});