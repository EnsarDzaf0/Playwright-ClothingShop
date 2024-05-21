import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pageObjects/home';
import { ProductDetailsPage } from '../pageObjects/productDetails';
import { reviewDataTypes } from '../interfaces/review';

test.describe('Product Review', () => {
    test('Successful Product Review', async ({ page }) => {
        const homePage = new HomePage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        await homePage.goto();
        await homePage.clickFirstHotSellerProduct();
        await productDetailsPage.switchToReviewsTab();
        await productDetailsPage.fillReviewForm({
            stars: 5,
            nickname: 'John Doe',
            summary: 'Great product!',
            review: 'I love this product!'
        });
        await productDetailsPage.clickSubmitButton();
        await expect(productDetailsPage.pageMessages).toBeVisible();
    });

});