import { Page } from 'playwright';

export class RegistrationPage {
    constructor(page: Page) {
        this.page = page;
        this.returningUserButton = this.page.getByText('Returning user');
        this.emailInput = this.page.locator('INPUT[type="email"]');
        this.submitButton = this.page.locator('button[type="submit"]');
    }

    async navigate() {
        await this.page.goto("https://demo.ft-crm.com/");
    }

    async login() {
        await this.returningUserButton.click();
        await this.emailInput.fill('ansh00000@gmail.com');
        await this.submitButton.click();
        console.log("")
    }
}