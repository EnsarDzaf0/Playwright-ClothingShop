import { test, expect } from '@playwright/test';
import { registrationParams, validInputs, invalidInputs } from '../test-params/registration/registration';

test('Valid registration input', async ({ page }) => {
    await page.goto(registrationParams.registrationLink);
    await expect(page).toHaveTitle(registrationParams.registrationPageTitle);

    const form = page.locator(registrationParams.registrationFormLocator);

    const firstName = form.getByTitle(registrationParams.registrationFormFields.firstName);
    const lastName = form.getByTitle(registrationParams.registrationFormFields.lastName);
    const email = form.getByTitle(registrationParams.registrationFormFields.email);
    const password = form.locator(registrationParams.registrationFormFields.password);
    const confirmPassword = form.getByTitle(registrationParams.registrationFormFields.passwordConfirmation);
    const createButton = form.getByTitle(registrationParams.registrationFormFields.submitButton);

    await firstName.fill(validInputs.firstName);
    await lastName.fill(validInputs.lastName);
    await email.fill(validInputs.email);
    await password.fill(validInputs.password);
    await confirmPassword.fill(validInputs.confirmPassword);

    await createButton.click();

    await page.waitForURL('**/customer/account/')
    await expect(page).toHaveTitle('My Account');
});

test('Invalid registration input', async ({ page }) => {
    await page.goto(registrationParams.registrationLink);
    await expect(page).toHaveTitle(registrationParams.registrationPageTitle);

    const form = page.locator(registrationParams.registrationFormLocator);

    const firstName = form.getByTitle(registrationParams.registrationFormFields.firstName);
    const lastName = form.getByTitle(registrationParams.registrationFormFields.lastName);
    const email = form.getByTitle(registrationParams.registrationFormFields.email);
    const password = form.locator(registrationParams.registrationFormFields.password);
    const confirmPassword = form.getByTitle(registrationParams.registrationFormFields.passwordConfirmation);
    const createButton = form.getByTitle(registrationParams.registrationFormFields.submitButton);

    await password.fill(invalidInputs.password.short);

    const passwordError = form.locator(registrationParams.passwordError.locator);
    await createButton.click();
    await expect(passwordError).toHaveText(registrationParams.passwordError.shortError);

    await password.fill(invalidInputs.password.oneClass);
    await createButton.click();
    await expect(passwordError).toHaveText(registrationParams.passwordError.classError);

    await password.fill(validInputs.password);
    await confirmPassword.fill(invalidInputs.password.short);
    await firstName.fill(invalidInputs.firstName);
    await lastName.fill(invalidInputs.lastName);
    await email.fill(invalidInputs.email);

    await createButton.click();

    const confirmPasswordError = form.locator(registrationParams.confirmPasswordError.locator);
    const emailError = form.locator(registrationParams.emailError.locator);

    await expect(confirmPasswordError).toHaveText(registrationParams.confirmPasswordError.error);
    await expect(emailError).toHaveText(registrationParams.emailError.error);

    await email.fill(validInputs.email);
    await confirmPassword.fill(validInputs.confirmPassword);

    await createButton.click();

    const errorMessageBox = form.locator(`div:has-text("${registrationParams.errorMessageBox.error}")`);
    expect(errorMessageBox).toBeTruthy();

    await firstName.clear();
    await password.fill(validInputs.password);
    await confirmPassword.fill(validInputs.confirmPassword);
    await createButton.click();
    const firstNameError = form.locator(registrationParams.firstNameError.locator);
    expect(firstNameError).toBeTruthy();
    await expect(firstNameError).toHaveText(registrationParams.requiredFieldMessage);
});