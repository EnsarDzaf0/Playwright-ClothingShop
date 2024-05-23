import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly pageLink: string;
    readonly pageTitle: string;
    readonly loginForm: Locator;
    readonly loginFormFields: {
        email: Locator;
        password: Locator;
        submitButton: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.pageLink = 'https://magento.softwaretestingboard.com/customer/account/login/';
        this.pageTitle = "Customer Login";
        this.loginForm = page.locator('form[id="login-form"]');
        this.loginFormFields = {
            email: this.loginForm.locator('input[id="email"] >> visible=true'),
            password: this.loginForm.locator('input[id="pass"] >> visible=true'),
            submitButton: this.loginForm.locator('button[id="send2"] >> visible=true')
        };
    }

    async goto() {
        await this.page.goto(this.pageLink);
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async fillEmail(email: string) {
        await this.loginFormFields.email.fill(email);
    }

    async fillPassword(password: string) {
        await this.loginFormFields.password.fill(password);
    }

    async clickSubmitButton() {
        await this.loginFormFields.submitButton.click();
    }

    async login(email: string, password: string) {
        if (email) await this.fillEmail(email);
        if (password) await this.fillPassword(password);
        await this.clickSubmitButton();
    }
}