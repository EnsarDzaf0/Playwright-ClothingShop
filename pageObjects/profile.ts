import { type Locator, type Page } from '@playwright/test';
import { editProfileDataTypes } from '../interfaces/editProfile';

export class ProfilePage {
    readonly page: Page;
    readonly userInfo: Locator;
    readonly editButton: Locator;
    readonly changePasswordButton: Locator;
    readonly editForm: Locator;
    readonly editFormFields: {
        firstName: Locator;
        lastName: Locator;
        email: Locator;
        currentPassword: Locator;
        newPassword: Locator;
        confirmPassword: Locator;
    };
    readonly saveButton: Locator;
    readonly changeEmailCheckbox: Locator;
    readonly changePasswordCheckbox: Locator;
    readonly pageMessages: Locator;
    readonly editFormErrors: {
        email: Locator;
        currentPassword: Locator;
        newPassword: Locator;
        confirmPassword: Locator;
    }

    constructor(page: Page) {
        this.page = page;
        this.userInfo = page.locator('div[class="box box-information"]');
        this.editButton = this.userInfo.locator('a[class="action edit"]');
        this.changePasswordButton = this.userInfo.locator('a[class="action change-password"]');
        this.editForm = page.locator('form[class="form form-edit-account"]');
        this.editFormFields = {
            firstName: this.editForm.locator('input[id="firstname"]'),
            lastName: this.editForm.locator('input[id="lastname"]'),
            email: this.editForm.locator('input[id="email"]'),
            currentPassword: this.editForm.locator('input[id="current-password"]'),
            newPassword: this.editForm.locator('input[id="password"]'),
            confirmPassword: this.editForm.locator('input[id="password-confirmation"]')
        };
        this.saveButton = this.editForm.locator('button[class="action save primary"]');
        this.changeEmailCheckbox = this.editForm.locator('input[id="change-email"]');
        this.changePasswordCheckbox = this.editForm.locator('input[id="change-password"]');
        this.pageMessages = page.locator('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"] >> visible=true');
        this.editFormErrors = {
            email: this.editForm.locator('div[id="email-error"]'),
            currentPassword: this.editForm.locator('div[id="current-password-error"]'),
            newPassword: this.editForm.locator('div[id="password-error"]'),
            confirmPassword: this.editForm.locator('div[id="password-confirmation-error"]')
        }
    }

    async clickEditButton() {
        await this.userInfo.scrollIntoViewIfNeeded();
        await this.editButton.click();
    }

    async clickChangePasswordButton() {
        await this.userInfo.scrollIntoViewIfNeeded();
        await this.changePasswordButton.click();
    }

    async fillFirstName(firstName: string) {
        await this.editFormFields.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.editFormFields.lastName.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.editFormFields.email.fill(email);
    }

    async fillCurrentPassword(currentPassword: string) {
        await this.editFormFields.currentPassword.fill(currentPassword);
    }

    async fillNewPassword(newPassword: string) {
        await this.editFormFields.newPassword.fill(newPassword);
    }

    async fillConfirmPassword(confirmPassword: string) {
        await this.editFormFields.confirmPassword.fill(confirmPassword);
    }

    async checkChangeEmail() {
        await this.changeEmailCheckbox.check();
    }

    async checkChangePassword() {
        await this.changePasswordCheckbox.check();
    }

    async uncheckChangeEmail() {
        await this.changeEmailCheckbox.uncheck();
    }

    async uncheckChangePassword() {
        await this.changePasswordCheckbox.uncheck();
    }

    async fillEditForm(editData: editProfileDataTypes) {
        if (editData.firstName) await this.fillFirstName(editData.firstName);
        if (editData.lastName) await this.fillLastName(editData.lastName);
        if (editData.email) await this.fillEmail(editData.email);
        if (editData.currentPassword) await this.fillCurrentPassword(editData.currentPassword);
        if (editData.newPassword) await this.fillNewPassword(editData.newPassword);
        if (editData.confirmPassword) await this.fillConfirmPassword(editData.confirmPassword);
    }

    async clickSaveButton() {
        await this.saveButton.scrollIntoViewIfNeeded();
        await this.saveButton.click();
    }

};