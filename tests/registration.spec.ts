import { test, expect, Locator } from '@playwright/test';
import { validInputs } from '../test-params/registration/registration';
import { RegistrationPage } from '../pageObjects/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

test('Valid registration input', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    await registrationPage.fillForm(validInputs);

    await registrationPage.clickSubmitButton();

    await registrationPage.page.waitForURL('**/customer/account/');
    await expect(registrationPage.page).toHaveTitle('My Account');
});

const csvData = parse(fs.readFileSync(path.resolve(__dirname, '../csvData/invalidRegistration.csv')), {
    columns: true,
    skip_empty_lines: true
});

for (const row of csvData) {
    test(`Invalid registration input - ${row.testName}`, async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goto();

        await registrationPage.fillForm({
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            password: row.password,
            confirmPassword: row.confirmPassword
        });

        await registrationPage.clickSubmitButton();

        let errorLocator: Locator;
        switch (row.errorType) {
            case 'password':
                errorLocator = registrationPage.formErrors.password;
                break;
            case 'confirmPassword':
                errorLocator = registrationPage.formErrors.confirmPassword;
                break;
            case 'email':
                errorLocator = registrationPage.formErrors.email;
                break;
            case 'firstName':
                errorLocator = registrationPage.formErrors.firstName;
                break;
            case 'lastName':
                errorLocator = registrationPage.formErrors.lastName;
                break;
            case 'errorMessageBox':
                errorLocator = registrationPage.formErrors.errorMessageBox;
                break;
            default:
                errorLocator = registrationPage.formErrors.errorMessageBox;
                break;
        }
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText(row.errorMessage);
    });
}