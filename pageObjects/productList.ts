import { expect, type Locator, type Page } from '@playwright/test';

export class ProductListPage {
    readonly page: Page;
    readonly menSection: Locator;
    readonly menTopsSection: Locator;
    readonly gearSection: Locator;
    readonly bagsSection: Locator;
    readonly products: Locator;
    readonly firstProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menSection = page.locator('a[id="ui-id-5"]');
        this.gearSection = page.locator('a[id="ui-id-6"]');
        this.menTopsSection = page.locator('a[id="ui-id-17"]');
        this.bagsSection = page.locator('a[id="ui-id-25"]');
        this.products = page.locator('ol[class="products list items product-items"]');
        this.firstProduct = this.products.locator('li').first();
    }

    async gotoMenTops() {
        await this.menSection.hover();
        await this.menTopsSection.click();
        await expect(this.page).toHaveTitle("Tops - Men");
    }

    async clickFirstProduct() {
        await this.products.locator('li').first().click();
    }

    async addFirstProductToCart() {
        await this.firstProduct.hover();
        await this.firstProduct.locator('button[class="action tocart primary"]').click();
    }

    async gotoBags() {
        await this.gearSection.hover();
        await this.bagsSection.click();
        await expect(this.page).toHaveTitle("Bags - Gear");
    }

    async reload() {
        await this.page.reload();
    }
}