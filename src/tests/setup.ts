import {test, TestFixture} from '@playwright/test';
import {AccountPage} from "../pages/registration";

//authorize user before executing a test

test.beforeEach(async ({ page }) => {
    const account = new AccountPage(page);
    await account.navigateStartPage();
    await account.clickReturningUserButton();
    await account.signIn('ansh120022@gmail.com');
});

