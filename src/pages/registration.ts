import { Page } from 'playwright';

export class AccountPage {
    constructor(page: Page) {
        this.page = page;
        this.returningUserButton = this.page.getByText('Returning user');
        this.newUserButton = this.page.getByText('New user')
        this.emailInput = this.page.locator('INPUT[type="email"]');
        this.passwordInput = this.page.locator('INPUT[type="password"]');
        this.numberInput = this.page.locator('INPUT[type="number"]');
        this.textInput= this.page.locator('INPUT[type="text"]');
        this.submitButton = this.page.locator('button[type="submit"]');
        this.agreeButton = this.page.getByText('I GET IT, CONTINUE');
    }

    async submitForm(){
        await this.submitButton.click();
    }

    async navigateStartPage() {
        await this.page.goto("https://demo.ft-crm.com/");
    }

    async signIn(email) {
        await this.emailInput.fill(email);
        await this.submitForm();
    }

    async signUp(email, password){
        await this.newUserButton.click();
        await this.agreeButton.click();
        await this.emailInput.fill(email);
        await this.submitForm();
        await this.textInput.fill('+357')
        await this.numberInput.fill('9690000')
        await this.submitForm();
        await this.textInput.fill('Anastasiia Sh')
        await this.submitForm();
        await this.passwordInput.fill(password)
        await this.submitForm();
    }

    async clickReturningUserButton(){
        await this.returningUserButton.click();
    }

}