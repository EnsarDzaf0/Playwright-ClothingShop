import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/home';
import { ProductDetailsPage } from '../pageObjects/productDetails';
import { ProductListPage } from '../pageObjects/productList';

test('Shopping Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goto();
    await productListPage.gotoMenTops();
    await productListPage.clickFirstProduct();
    await productDetailsPage.selectFirstSize();
    await productDetailsPage.selectFirstColor();
    await productDetailsPage.clickAddToCart();

    await expect(productDetailsPage.pageMessages).toBeVisible();

    await productListPage.gotoBags();
    await productListPage.clickFirstProduct();
    await productDetailsPage.clickAddToCart();

    await expect(productDetailsPage.pageMessages).toBeVisible();

    await homePage.openMiniCart();

    await expect(homePage.miniCartItems).toHaveCount(2);
});