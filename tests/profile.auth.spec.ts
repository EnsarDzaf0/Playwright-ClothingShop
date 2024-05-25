import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pageObjects/home';
import { ProfilePage } from '../pageObjects/profile';
import { LoginPage } from '../pageObjects/login';
import { generateRandomEmail } from '../utils/emailUtils';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

test.describe('Profile Management', () => {
    test('Edit First & Last Name', async ({ page }) => {
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);

        await homePage.goto();
        await homePage.openMyAccount();

        await profilePage.clickEditButton();
        await profilePage.fillFirstName('John');
        await profilePage.fillLastName('Doe');
        await profilePage.saveButton.click();

        await profilePage.page.waitForURL('**/customer/account/');
        await expect(profilePage.pageMessages).toHaveText('You saved the account information.');
    });

    test('Edit Email & Password', async ({ page }) => {
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.openMyAccount();

        const newEmail = generateRandomEmail();
        await profilePage.clickChangePasswordButton();
        await profilePage.changeEmailCheckbox.check();
        await profilePage.changePasswordCheckbox.check();
        await profilePage.fillEditForm({
            email: newEmail,
            currentPassword: 'Password123',
            newPassword: 'Password123',
            confirmPassword: 'Password123'
        })
        await profilePage.saveButton.click();

        await profilePage.page.waitForURL('**/customer/account/login/');
        await expect(profilePage.pageMessages).toHaveText('You saved the account information.');

        await loginPage.login(newEmail, 'Password123');
        await profilePage.page.waitForURL('**/customer/account/');
        await expect(profilePage.page).toHaveTitle('My Account');
    });

    const csvData = parse(fs.readFileSync(path.resolve(__dirname, '../csvData/invalidEditAccount.csv')), {
        columns: true,
        skip_empty_lines: true
    });

    for (const row of csvData) {
        test(`Invalid edit account input - ${row.testName}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const profilePage = new ProfilePage(page);

            await homePage.goto();
            await homePage.openMyAccount();

            await profilePage.clickChangePasswordButton();
            await profilePage.changeEmailCheckbox.check();
            await profilePage.changePasswordCheckbox.check();

            await profilePage.fillEditForm({
                email: row.email,
                currentPassword: row.currentPassword,
                newPassword: row.newPassword,
                confirmPassword: row.confirmPassword
            });

            await profilePage.saveButton.click();

            let errorLocator: Locator;

            switch (row.errorType) {
                case 'email':
                    errorLocator = profilePage.editFormErrors.email;
                    break;
                case 'currentPassword':
                    errorLocator = profilePage.editFormErrors.currentPassword;
                    break;
                case 'password':
                    errorLocator = profilePage.editFormErrors.newPassword;
                    break;
                case 'confirmPassword':
                    errorLocator = profilePage.editFormErrors.confirmPassword;
                    break;
                default:
                    errorLocator = profilePage.pageMessages;
                    break;
            }

            await expect(errorLocator).toBeVisible();
            await expect(errorLocator).toHaveText(row.errorMessage);
        });
    }
});