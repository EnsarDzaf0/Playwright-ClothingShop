import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pageObjects/checkout';
import { HomePage } from '../pageObjects/home';
import { ProductDetailsPage } from '../pageObjects/productDetails';
import { ProductListPage } from '../pageObjects/productList';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

test.describe('Checkout', () => {
    test('Valid checkout input', async ({ page }) => {
        const homePage = new HomePage(page);
        const productListPage = new ProductListPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const checkoutPage = new CheckoutPage(page);

        await homePage.goto();

        await productListPage.gotoBags();
        await productListPage.clickFirstProduct();
        await productDetailsPage.clickAddToCart();

        await productDetailsPage.pageMessages.scrollIntoViewIfNeeded();
        await expect(productDetailsPage.pageMessages).toBeVisible();

        await homePage.openMiniCart();

        await expect(homePage.miniCartItems).toBeVisible();
        await homePage.openCheckout();

        await expect(checkoutPage.page).toHaveTitle('Checkout');

        await checkoutPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            company: 'Acme Inc',
            address: '123 Main St',
            city: 'New York',
            state: 'New York',
            zip: '10001',
            country: 'United States',
            telephone: '1234567890',
            email: 'totallyvalid@email.com'
        });

        await checkoutPage.selectShippingMethod();
        await checkoutPage.clickNextButton();
        await checkoutPage.clickPlaceOrderButton();

        await expect(checkoutPage.thankYouMessage).toBeVisible();
        await expect(checkoutPage.thankYouMessage).toHaveText('Thank you for your purchase!');
    });

    const csvData = parse(fs.readFileSync(path.resolve(__dirname, '../csvData/invalidCheckout.csv')), {
        columns: true,
        skip_empty_lines: true
    });

    for (const row of csvData) {
        test(`Invalid checkout input - ${row.testName}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const productListPage = new ProductListPage(page);
            const productDetailsPage = new ProductDetailsPage(page);
            const checkoutPage = new CheckoutPage(page);

            await homePage.goto();

            await productListPage.gotoBags();
            await productListPage.clickFirstProduct();
            await productDetailsPage.clickAddToCart();

            await productDetailsPage.pageMessages.scrollIntoViewIfNeeded();
            await expect(productDetailsPage.pageMessages).toBeVisible();

            await homePage.openMiniCart();

            await expect(homePage.miniCartItems).toBeVisible();
            await homePage.openCheckout();

            await expect(checkoutPage.page).toHaveTitle('Checkout');

            await checkoutPage.fillForm({
                firstName: row.firstName,
                lastName: row.lastName,
                company: row.company,
                address: row.address,
                city: row.city,
                state: row.state,
                zip: row.zip,
                country: row.country,
                telephone: row.telephone,
                email: "totallyvalid@email.com"
            });
            await checkoutPage.selectShippingMethod();
            await checkoutPage.clickNextButton();
            await expect(checkoutPage.shippingForm).toContainText(row.errorMessage);
        });
    }
});