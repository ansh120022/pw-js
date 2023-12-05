import { type Page } from 'playwright'
import { type Locator } from '@playwright/test'

export class AccountPage {
  private readonly page: Page
  private readonly returningUserButton: Locator
  private readonly newUserButton: Locator
  private readonly emailInput: Locator
  private readonly passwordInput: Locator
  private readonly numberInput: Locator
  private readonly textInput: Locator
  private readonly submitButton: Locator
  private readonly agreeButton: Locator

  constructor (page: Page) {
    this.page = page
    this.returningUserButton = this.page.getByRole('button', { name: 'Returning user' })
    this.newUserButton = this.page.getByRole('button', { name: 'New user' })
    this.emailInput = this.page.locator('INPUT[type="email"]')
    this.passwordInput = this.page.locator('INPUT[type="password"]')
    this.numberInput = this.page.locator('INPUT[type="number"]')
    this.textInput = this.page.locator('INPUT[type="text"]')
    this.submitButton = this.page.locator('button[type="submit"]')
    this.agreeButton = this.page.getByText('I GET IT, CONTINUE')
  }

  async submitForm (): Promise<void> {
    await this.submitButton.click()
  }

  async navigateStartPage (): Promise<void> {
    await this.page.goto('https://demo.ft-crm.com/')
  }

  async signIn (email: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.submitForm()
  }

  async signUp (email: string, password: string): Promise<void> {
    await this.newUserButton.click()
    await this.agreeButton.click()
    await this.emailInput.fill(email)
    await this.submitForm()
    await this.textInput.fill('+357')
    await this.numberInput.fill('9690000')
    await this.submitForm()
    await this.textInput.fill('Anastasiia Sh')
    await this.submitForm()
    await this.passwordInput.fill(password)
    await this.submitForm()
  }

  async clickReturningUserButton (): Promise<void> {
    await this.returningUserButton.click()
  }
}
