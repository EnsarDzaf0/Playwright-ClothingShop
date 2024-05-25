import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeLink: string;
    readonly hotSellers: Locator;
    readonly accountDropdownButton: Locator;
    readonly signOutButton: Locator;
    readonly myAccountButton: Locator;
    readonly shoppingCart: Locator;
    readonly miniCart: Locator;
    readonly miniCartItems: Locator;
    readonly firstItemInMiniCart: Locator;
    readonly firstItemDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = 'https://magento.softwaretestingboard.com/';
        this.hotSellers = page.locator('ol[class="product-items widget-product-grid"]');
        this.accountDropdownButton = page.locator('span[class="customer-name"] >> visible=true');
        this.signOutButton = page.locator('li[class="authorization-link"] >> visible=true');
        this.myAccountButton = page.getByRole('link', { name: 'My Account' })
        this.shoppingCart = page.locator('a[class="action showcart"]');
        this.miniCart = page.locator('div[id="minicart-content-wrapper"]');
        this.miniCartItems = this.miniCart.locator('div[class="minicart-items-wrapper"]');
        this.firstItemInMiniCart = this.miniCartItems.locator('li').first();
        this.firstItemDeleteButton = this.firstItemInMiniCart.locator('a[class="action delete"]');
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

    async openMyAccount() {
        await this.accountDropdownButton.click();
        await expect(this.myAccountButton).toBeVisible();
        await this.myAccountButton.click();
    }

    async openMiniCart() {
        await this.shoppingCart.click();
    }

    async deleteFirstItemFromMiniCart() {
        await this.firstItemInMiniCart.hover();
        await this.firstItemDeleteButton.click();
    }
};