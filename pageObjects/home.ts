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
    readonly firstItemQuantity: Locator;
    readonly updateQuantityButton: Locator;
    readonly miniCartTotal: Locator;
    readonly confirmDeleteButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = 'https://magento.softwaretestingboard.com/';
        this.hotSellers = page.locator('ol[class="product-items widget-product-grid"]');
        this.accountDropdownButton = page.locator('span[class="customer-name"] >> visible=true');
        this.signOutButton = page.locator('li[class="authorization-link"] >> visible=true');
        this.myAccountButton = page.getByRole('link', { name: 'My Account' })
        this.shoppingCart = page.locator('a[class="action showcart"]');
        this.miniCart = page.locator('div[id="minicart-content-wrapper"]');
        this.miniCartItems = this.miniCart.locator('ol[id="mini-cart"]');
        this.firstItemInMiniCart = this.miniCartItems.locator('li').first();
        this.firstItemDeleteButton = this.firstItemInMiniCart.locator('a[class="action delete"]');
        this.firstItemQuantity = this.firstItemInMiniCart.locator('input[class="item-qty cart-item-qty"]');
        this.updateQuantityButton = this.firstItemInMiniCart.locator('button[class="update-cart-item"]');
        this.miniCartTotal = this.miniCart.locator('div[class="subtotal"]').locator('span[class="price"]');
        this.confirmDeleteButton = page.locator('button[class="action-primary action-accept"]');
        this.checkoutButton = page.locator('button[id="top-cart-btn-checkout"]');
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
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/');
        await expect(this.page).toHaveTitle('My Account');
    }

    async openMiniCart() {
        await this.shoppingCart.click();
    }

    async deleteFirstItemFromMiniCart() {
        await this.firstItemDeleteButton.click();
        await expect(this.confirmDeleteButton).toBeVisible();
        await this.confirmDeleteButton.click();
    }

    async updateFirstItemQuantity(quantity: number) {
        await this.firstItemQuantity.fill(String(quantity));
        await this.firstItemQuantity.blur();
        await expect(this.updateQuantityButton).toBeVisible();
        await this.updateQuantityButton.click();
    }

    async openCheckout() {
        await this.checkoutButton.click();
    }
};