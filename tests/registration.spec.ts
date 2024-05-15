import { test, expect } from '@playwright/test';
import { registrationParams, validInputs, invalidInputs } from '../test-params/registration/registration';
import { RegistrationPage } from '../pageObjects/registration';

test('Valid registration input', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    await registrationPage.fillForm({
        firstName: validInputs.firstName,
        lastName: validInputs.lastName,
        email: validInputs.email,
        password: validInputs.password,
        confirmPassword: validInputs.confirmPassword
    });

    await registrationPage.clickSubmitButton();

    await registrationPage.page.waitForURL('**/customer/account/');
    await expect(registrationPage.page).toHaveTitle('My Account');
});

test('Invalid registration input', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    await registrationPage.fillPassword(invalidInputs.password.short);
    await registrationPage.clickSubmitButton();
    await expect(registrationPage.formErrors.password).toHaveText(registrationParams.passwordError.shortError);

    await registrationPage.fillPassword(invalidInputs.password.oneClass);
    await registrationPage.clickSubmitButton();
    await expect(registrationPage.formErrors.password).toHaveText(registrationParams.passwordError.classError);

    await registrationPage.fillPassword(validInputs.password);
    await registrationPage.fillPasswordConfirmation(invalidInputs.password.short);
    await registrationPage.fillFirstName(invalidInputs.firstName);
    await registrationPage.fillLastName(invalidInputs.lastName);
    await registrationPage.fillEmail(invalidInputs.email);

    await registrationPage.clickSubmitButton();

    await expect(registrationPage.formErrors.confirmPassword).toHaveText(registrationParams.confirmPasswordError.error);
    await expect(registrationPage.formErrors.email).toHaveText(registrationParams.emailError.error);

    await registrationPage.fillEmail(validInputs.email);
    await registrationPage.fillPasswordConfirmation(validInputs.confirmPassword);

    await registrationPage.clickSubmitButton();

    expect(registrationPage.formErrors.errorMessageBox).toBeTruthy();

    await registrationPage.formFields.firstName.clear();
    await registrationPage.fillPassword(validInputs.password);
    await registrationPage.fillPasswordConfirmation(validInputs.confirmPassword);
    await registrationPage.clickSubmitButton();
    expect(registrationPage.formErrors.firstName).toBeTruthy();
});