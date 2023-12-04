import { Page, Locator, delay } from '@playwright/test';

export class GamePage {
    private page: Page;
    private catImages: string[];
    private balance: Locator;
    private navigation: Locator;
    private casino: Locator;
    private betValue: Locator;
    private winAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.catImages = ["/_nuxt/img/cat1.9386b22.png", "/_nuxt/img/cat2.248e071.png", "/_nuxt/img/cat3.585a357.png", "/_nuxt/img/cat4.fc0f54a.png"];
        this.balance = this.page.frameLocator('iframe').locator("//div[contains(text(),'Balance')]");
        this.navigation = this.page.locator("DIV[id='navigation']");
        this.casino = this.page.locator("//a[.='Casino']");
        this.betValue = this.page.frameLocator('iframe').locator("//select/option[@selected='selected']");
        this.winAmount = this.page.frameLocator('iframe').locator("//h1[contains(text(), 'Congratulations')]/following-sibling::h2/span")
    }
    async getGameBalance(){
        const balanceText = await this.balance.innerText();
        const balanceValue : number = parseFloat(balanceText.split('€ ')[1]);
        return balanceValue;
    }

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async openGame(): Promise<void> {
        await this.navigation.click();
        await this.casino.click();
    }

    async getBetValue(): Promise<number> {
        return parseFloat(<string>await this.betValue.getAttribute('value'));
    }

    async clickRandomCat(): Promise<number | 'loss'> {
        const randomCat = this.catImages[Math.floor(Math.random() * this.catImages.length)];
        await this.delay(2000);

        const randomCatLocator = this.page.frameLocator('iframe').locator(`//img[@src='${randomCat}']`);
        await randomCatLocator.click();

        const result = await this.winAmount.innerHTML();
        console.log('Win Amount Inner Text:', result);

        if (result === '€0') {
            return 'loss';
        } else {
            const resultValue = parseFloat(result.replace('€', ''));
            return resultValue;
        }
    }

}
