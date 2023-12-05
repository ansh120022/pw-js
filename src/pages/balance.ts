import { type Page } from 'playwright'

export class BalancePage {
  constructor (page: Page) {
    this.page = page
    this.balanceButton = this.page.locator('BUTTON[class="button money"]')
    this.bonus500option = this.page.locator('SELECT[class="form-input"]')
    this.cardOption = this.page.getByText('Card')
    this.option500eur = this.page.locator("//button[.='€500']")
    this.depositApproved = this.page.getByText('Deposit Approved')
    this.closeModal = this.page.locator("//div[@class='modal__x']")
  }

  async getBalanceButtonLocator (): Promise<Locator> {
    return this.balanceButton
  }

  async getBalanceValue (): Promise<number> {
    const balanceButtonText = await this.page.textContent('BUTTON[class="button money"]')
    const balanceValue = parseFloat(balanceButtonText.replace('€', ''))
    return balanceValue
  }

  async topUp (): Promise<void> {
    await this.balanceButton.click()
    await this.bonus500option.selectOption('FastTrackBonus + 500%')
    await this.cardOption.click()
    await this.option500eur.click()
    await this.depositApproved.click()
    await this.closeModal.click()
  }
}
