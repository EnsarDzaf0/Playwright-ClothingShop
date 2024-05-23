import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeLink: string;
    readonly hotSellers: Locator;
    readonly accountDropdownButton: Locator;
    readonly signOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = 'https://magento.softwaretestingboard.com/';
        this.hotSellers = page.locator('ol[class="product-items widget-product-grid"]');
        this.accountDropdownButton = page.locator('button[data-action="customer-menu-toggle"] >> visible=true');
        this.signOutButton = page.locator('li[class="authorization-link"] >> visible=true');
    }

    async goto() {
        await this.page.goto(this.homeLink);
        await expect(this.page).toHaveTitle('Home Page');
    }

    async clickFirstHotSellerProduct() {
        await this.hotSellers.locator('li').first().click();
    }

    async logout() {
        await this.accountDropdownButton.click();
        await this.signOutButton.click();
    }
};