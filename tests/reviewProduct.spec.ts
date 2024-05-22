import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pageObjects/home';
import { ProductDetailsPage } from '../pageObjects/productDetails';

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

    test('Invalid Product Review Form Input', async ({ page }) => {
        const homePage = new HomePage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        await homePage.goto();
        await homePage.clickFirstHotSellerProduct();
        await productDetailsPage.switchToReviewsTab();
        await productDetailsPage.clickSubmitButton();
        await expect(productDetailsPage.reviewFormErrors.stars).toBeVisible();
        await expect(productDetailsPage.reviewFormErrors.nickname).toBeVisible();
        await expect(productDetailsPage.reviewFormErrors.summary).toBeVisible();
        await expect(productDetailsPage.reviewFormErrors.review).toBeVisible();
    });
});