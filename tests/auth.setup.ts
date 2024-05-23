import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pageObjects/registration';
import { validInputs } from '../test-params/registration/registration';

const authFile = '.auth/user.json';

test('auth', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();

    await registrationPage.fillForm(validInputs);

    await registrationPage.clickSubmitButton();

    await registrationPage.page.waitForURL('**/customer/account/');
    await expect(registrationPage.page).toHaveTitle('My Account');

    await page.context().storageState({ path: authFile });
});