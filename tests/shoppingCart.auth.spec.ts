import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/home';
import { ProductDetailsPage } from '../pageObjects/productDetails';
import { ProductListPage } from '../pageObjects/productList';

test.describe('Shopping Cart', () => {
    test('Add from product listing & detail page', async ({ page }) => {
        const homePage = new HomePage(page);
        const productListPage = new ProductListPage(page);
        const productDetailsPage = new ProductDetailsPage(page);

        await homePage.goto();
        await productListPage.gotoMenTops();
        await productListPage.clickFirstProduct();
        await productDetailsPage.selectFirstSize();
        await productDetailsPage.selectFirstColor();
        await productDetailsPage.clickAddToCart();

        await productDetailsPage.pageMessages.scrollIntoViewIfNeeded();
        await expect(productDetailsPage.pageMessages).toBeVisible();

        await productListPage.gotoBags();
        await productListPage.reload();
        await productListPage.addFirstProductToCart();

        await productDetailsPage.pageMessages.scrollIntoViewIfNeeded();
        await expect(productDetailsPage.pageMessages).toBeVisible();

        await homePage.openMiniCart();

        await expect(homePage.miniCartItems).toBeVisible();
        const miniCartItems = homePage.miniCartItems.locator('li');
        await expect(miniCartItems).toHaveCount(2);
    });

    test('Add to cart then update and remove', async ({ page }) => {
        const homePage = new HomePage(page);
        const productListPage = new ProductListPage(page);
        const productDetailsPage = new ProductDetailsPage(page);

        await homePage.goto();

        await productListPage.gotoBags();
        await productListPage.clickFirstProduct();
        await productDetailsPage.clickAddToCart();

        await productDetailsPage.pageMessages.scrollIntoViewIfNeeded();
        await expect(productDetailsPage.pageMessages).toBeVisible();

        await homePage.openMiniCart();

        await expect(homePage.miniCartItems).toBeVisible();

        const currentTotal = await homePage.miniCartTotal.innerText();

        await homePage.updateFirstItemQuantity(3);

        await expect(homePage.miniCartTotal).not.toHaveText(currentTotal);

        const miniCartItems = homePage.miniCartItems.locator('li');
        const countCartItems = await miniCartItems.count();
        await homePage.deleteFirstItemFromMiniCart();

        await expect(miniCartItems).toHaveCount(countCartItems - 1);
    });
});