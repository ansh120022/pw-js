import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/registration';
const faker = require('faker');


test('Registration test', async ({ page }) => {faker
    const account = new AccountPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    await account.navigateStartPage();
    await account.signUp(email, password);
    const balanceButton = await page.getByText("Login");
    await balanceButton.click();
    await account.signIn(email);
    await expect(balanceButton).toBeVisible();

});