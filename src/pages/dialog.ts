import { type Page } from 'playwright'

export class BrowserDialog {
  constructor (page: Page) {
    this.page = page
  }

  async acceptExpectedDialog (expectedText: string): Promise<void> {
    // Accept dialog if text is expected
    const dialog = await this.page.waitForEvent('dialog')
    const dialogText = dialog.message()
    if (dialogText === expectedText) {
      await dialog.accept()
    } else {
      await page.screenshot({ path: 'unexpected_dialog.png' })
    }
  }
}
