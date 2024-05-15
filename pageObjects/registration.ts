import { expect, type Locator, type Page } from '@playwright/test';
import { registrationParams } from '../test-params/registration/registration';
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
        errorMessageBox: Locator;
    }

    constructor(page: Page) {
        this.page = page;
        this.registrationLink = registrationParams.registrationLink;
        this.registrationPageTitle = registrationParams.registrationPageTitle;
        this.form = page.locator(registrationParams.registrationFormLocator);
        this.formFields = {
            firstName: this.form.getByTitle(registrationParams.registrationFormFields.firstName),
            lastName: this.form.getByTitle(registrationParams.registrationFormFields.lastName),
            email: this.form.getByTitle(registrationParams.registrationFormFields.email),
            password: this.form.locator(registrationParams.registrationFormFields.password),
            passwordConfirmation: this.form.getByTitle(registrationParams.registrationFormFields.passwordConfirmation),
            submitButton: this.form.getByTitle(registrationParams.registrationFormFields.submitButton)
        };
        this.formErrors = {
            password: this.form.locator(registrationParams.passwordError.locator),
            confirmPassword: this.form.locator(registrationParams.confirmPasswordError.locator),
            email: this.form.locator(registrationParams.emailError.locator),
            firstName: this.form.locator(registrationParams.firstNameError.locator),
            errorMessageBox: this.form.locator(`div:has-text("${registrationParams.errorMessageBox.error}"`)
        }
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