import { expect, type Locator, type Page } from '@playwright/test';
import { formDataTypes } from '../interfaces/registration';

export class RegistrationPage {
    readonly page: Page;
    readonly registrationLink: string;
    readonly registrationPageTitle: string;
    readonly form: Locator;
    readonly formFields: {
        firstName: Locator;
        lastName: Locator;
        email: Locator;
        password: Locator;
        passwordConfirmation: Locator;
        submitButton: Locator;
    };
    readonly formErrors: {
        password: Locator;
        confirmPassword: Locator;
        email: Locator;
        firstName: Locator;
        lastName: Locator;
    };
    readonly errorMessageBox: Locator;


    constructor(page: Page) {
        this.page = page;
        this.registrationLink = 'https://magento.softwaretestingboard.com/customer/account/create/';
        this.registrationPageTitle = 'Create New Customer Account';
        this.form = page.locator('form[id="form-validate"]');
        this.formFields = {
            firstName: this.form.getByTitle('First Name'),
            lastName: this.form.getByTitle('Last Name'),
            email: this.form.getByTitle('Email'),
            password: this.form.locator('input[id="password"]'),
            passwordConfirmation: this.form.getByTitle('Confirm Password'),
            submitButton: this.form.getByTitle('Create an Account')
        };
        this.formErrors = {
            password: this.form.locator('div[id="password-error"]'),
            confirmPassword: this.form.locator('div[id="password-confirmation-error"]'),
            email: this.form.locator('div[id="email_address-error"]'),
            firstName: this.form.locator('div[id="firstname-error"]'),
            lastName: this.form.locator('div[id="lastname-error"]'),
        };
        this.errorMessageBox = page.locator('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"] >> visible=true')
    }

    async goto() {
        await this.page.goto(this.registrationLink);
        await expect(this.page).toHaveTitle(this.registrationPageTitle);
    }

    async fillFirstName(firstName: string) {
        typeof firstName === 'string' ? await this.formFields.firstName.fill(firstName) : null;
    }

    async fillLastName(lastName: string) {
        typeof lastName === 'string' ? await this.formFields.lastName.fill(lastName) : null;
    }

    async fillEmail(email: string) {
        typeof email === 'string' ? await this.formFields.email.fill(email) : null;
    }

    async fillPassword(password: string) {
        typeof password === 'string' ? await this.formFields.password.fill(password) : null;
    }

    async fillPasswordConfirmation(passwordConfirmation: string) {
        typeof passwordConfirmation === 'string' ? await this.formFields.passwordConfirmation.fill(passwordConfirmation) : null;
    }

    async clickSubmitButton() {
        await this.formFields.submitButton.click();
    }

    async fillForm(formData: formDataTypes) {
        await this.fillFirstName(formData.firstName!);
        await this.fillLastName(formData.lastName!);
        await this.fillEmail(formData.email!);
        await this.fillPassword(formData.password!);
        await this.fillPasswordConfirmation(formData.confirmPassword!);
    }
};