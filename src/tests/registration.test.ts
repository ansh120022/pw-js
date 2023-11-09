import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration';

test('Login test', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.login();
    const balanceButton = await page.locator('BUTTON[class="button money"]');
    await expect(balanceButton).toBeVisible();
    await page.screenshot({ path: 'login.png' });
});