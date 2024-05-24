import { type Locator, type Page } from '@playwright/test';
import { reviewDataTypes } from '../interfaces/review';

export class ProductDetailsPage {
    readonly page: Page;
    readonly productDetails: Locator;
    readonly reviewsTab: Locator;
    readonly reviewForm: Locator;
    readonly reviewFormFields: {
        stars: Locator;
        nickname: Locator;
        summary: Locator;
        review: Locator;
        submitButton: Locator;
    };
    readonly pageMessages: Locator;
    readonly reviewFormErrors: {
        stars: Locator;
        nickname: Locator;
        summary: Locator;
        review: Locator;
    }
    readonly sizePicker: Locator;
    readonly colorPicker: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productDetails = page.locator('div[class="product data items"]');
        this.reviewsTab = this.productDetails.locator('div[id="tab-label-reviews"]');
        this.reviewForm = this.productDetails.locator('form[class="review-form"]');
        this.reviewFormFields = {
            stars: this.reviewForm.locator('div[class="control review-control-vote"]'),
            nickname: this.reviewForm.locator('input[id="nickname_field"]'),
            summary: this.reviewForm.locator('input[id="summary_field"]'),
            review: this.reviewForm.locator('textarea[id="review_field"]'),
            submitButton: this.reviewForm.locator('button[class="action submit primary"]')
        };
        this.pageMessages = page.locator('div[class="page messages"]');
        this.reviewFormErrors = {
            stars: this.reviewForm.locator('div[id="ratings[4]-error"]'),
            nickname: this.reviewForm.locator('div[id="nickname_field-error"]'),
            summary: this.reviewForm.locator('div[id="summary_field-error"]'),
            review: this.reviewForm.locator('div[id="review_field-error"]')
        }
        this.sizePicker = page.locator('div[class="swatch-attribute-options clearfix"]').first();
        this.colorPicker = page.locator('div[class="swatch-attribute-options clearfix"]').last();
        this.addToCartButton = page.locator('button[title="Add to Cart"]');
    }

    async switchToReviewsTab() {
        await this.productDetails.scrollIntoViewIfNeeded();
        await this.reviewsTab.click();
    }

    async selectStarRating(starRating: number) {
        if (starRating < 1 || starRating > 5) {
            throw new Error('Star rating must be between 1 and 5');
        }
        await this.reviewForm.scrollIntoViewIfNeeded();
        console.log(`Selecting Rating_${starRating}_label star rating`);
        this.reviewForm.locator(`label[id="Rating_${starRating}_label"]`).click({ force: true });
    }

    async fillNickname(nickname: string) {
        await this.reviewFormFields.nickname.scrollIntoViewIfNeeded();
        await this.reviewFormFields.nickname.fill(nickname);
    }

    async fillSummary(summary: string) {
        await this.reviewFormFields.summary.scrollIntoViewIfNeeded();
        await this.reviewFormFields.summary.fill(summary);
    }

    async fillReview(review: string) {
        await this.reviewFormFields.review.scrollIntoViewIfNeeded();
        await this.reviewFormFields.review.fill(review);
    }

    async clickSubmitButton() {
        await this.reviewFormFields.submitButton.scrollIntoViewIfNeeded();
        await this.reviewFormFields.submitButton.click();
    }

    async fillReviewForm(review: reviewDataTypes) {
        if (review.stars) await this.selectStarRating(review.stars);
        if (review.nickname) await this.fillNickname(review.nickname);
        if (review.summary) await this.fillSummary(review.summary);
        if (review.review) await this.fillReview(review.review);
    }

    async selectFirstSize() {
        await this.sizePicker.locator('div[class="swatch-option text"]').first().click();
    }

    async selectFirstColor() {
        await this.colorPicker.locator('div[class="swatch-option color"]').first().click();
    }

    async clickAddToCart() {
        await this.addToCartButton.scrollIntoViewIfNeeded();
        await this.addToCartButton.click();
    }
};