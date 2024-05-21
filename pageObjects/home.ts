import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeLink: string;
    readonly hotSellers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = 'https://magento.softwaretestingboard.com/';
        this.hotSellers = page.locator('ol[class="product-items widget-product-grid"]');
    }

    async goto() {
        await this.page.goto(this.homeLink);
        await expect(this.page).toHaveTitle('Home Page');
    }

    async clickFirstHotSellerProduct() {
        await this.hotSellers.locator('li').first().click();
    }
};