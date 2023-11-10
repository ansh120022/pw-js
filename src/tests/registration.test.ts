import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';


test('Registration test', async ({ page }) => {
    const account = new AccountPage(page);

    await account.navigateStartPage();
    await account.signUp();

});

test('Authorization test', async ({ page }) => {
    const account = new AccountPage(page);

    await account.navigateStartPage();
    await account.signIn();
    const balanceButton = await page.locator('BUTTON[class="button money"]');
    await expect(balanceButton).toBeVisible();
    await page.screenshot({ path: 'login.png' });
});