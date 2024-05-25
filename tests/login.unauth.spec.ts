import { test, expect, Locator } from '@playwright/test';
import { validInputs } from '../test-params/registration/registration';
import { RegistrationPage } from '../pageObjects/registration';
import { LoginPage } from '../pageObjects/login';
import { HomePage } from '../pageObjects/home';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

test.describe('Login', () => {
    test('Successful login', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await registrationPage.goto();

        const userData = validInputs;
        await registrationPage.fillForm(userData);

        await registrationPage.clickSubmitButton();

        await registrationPage.page.waitForURL('**/customer/account/');
        await expect(registrationPage.page).toHaveTitle('My Account');

        await homePage.logout();
        await loginPage.goto();
        await loginPage.login(userData.email || '', userData.password || '');

        await loginPage.page.waitForURL('**/customer/account/');
        await expect(loginPage.page).toHaveTitle('My Account');
    });

    const csvData = parse(fs.readFileSync(path.resolve(__dirname, '../csvData/invalidLogin.csv')), {
        columns: true,
        skip_empty_lines: true
    });

    for (const row of csvData) {
        test(`Invalid login input - ${row.testName}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            await loginPage.login(row.email, row.password);

            let errorLocator: Locator;
            switch (row.errorType) {
                case 'email':
                    errorLocator = loginPage.loginFormErrors.email;
                    break;
                case 'password':
                    errorLocator = loginPage.loginFormErrors.password;
                    break;
                default:
                    errorLocator = loginPage.errorMessageBox;
                    break;
            }
            await expect(errorLocator).toBeVisible();
            await expect(errorLocator).toHaveText(row.errorMessage);
        });
    }
});