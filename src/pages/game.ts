import { type Page, type Locator } from '@playwright/test'

export class GamePage {
  private readonly page: Page
  private readonly catImages: string[]
  private readonly balance: Locator
  private readonly navigation: Locator
  private readonly casino: Locator
  private readonly betValue: Locator
  private readonly winAmount: Locator

  constructor (page: Page) {
    this.page = page
    this.catImages = ['/_nuxt/img/cat1.9386b22.png', '/_nuxt/img/cat2.248e071.png', '/_nuxt/img/cat3.585a357.png', '/_nuxt/img/cat4.fc0f54a.png']
    this.balance = this.page.frameLocator('iframe').locator("//div[contains(text(),'Balance')]")
    this.navigation = this.page.locator("DIV[id='navigation']")
    this.casino = this.page.getByRole('link', { name: 'Casino' })
    this.betValue = this.page.frameLocator('#game').locator("//select/option[@selected='selected']")
    this.winAmount = this.page.frameLocator('#game').locator("//h1[contains(text(), 'Congratulations')]/following-sibling::h2/span")
  }

  async getGameBalance (): Promise<number> {
    const balanceText = await this.balance.innerText()
    const balanceValue: number = parseFloat(balanceText.split('€ ')[1])
    return balanceValue
  }

  async delay (ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

  async openGame (): Promise<void> {
    await this.navigation.click()
    await this.casino.click()
  }

  async getBetValue (): Promise<number> {
    return parseFloat((await this.betValue.getAttribute('value') as string))
  }

  async clickRandomCat (): Promise<number | 'loss'> {
    const randomCat = this.catImages[Math.floor(Math.random() * this.catImages.length)]
    await this.delay(2000)

    const randomCatLocator = this.page.frameLocator('#game').locator(`//img[@src='${randomCat}']`)
    await randomCatLocator.click()

    const result = await this.winAmount.innerHTML()
    console.log('Win Amount Inner Text:', result)

    if (result === '€0') {
      return 'loss'
    } else {
      const resultValue = parseFloat(result.replace('€', ''))
      return resultValue
    }
  }
}
