import { Page } from 'playwright';

export class BalancePage {
    constructor(page: Page) {
        this.page = page;
        this.balanceButton = this.page.locator('BUTTON[class="button money"]');
    }
}