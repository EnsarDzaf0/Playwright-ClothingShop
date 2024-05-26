import { expect, type Locator, type Page } from '@playwright/test';
import { CheckoutDataTypes } from '../interfaces/checkout';

export class CheckoutPage {
    readonly page: Page;
    readonly shippingForm: Locator;
    readonly newAddressButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly firstAddressInput: Locator;
    readonly cityInput: Locator;
    readonly stateSelect: Locator;
    readonly stateInput: Locator;
    readonly zipInput: Locator;
    readonly countrySelect: Locator;
    readonly telephoneInput: Locator;
    readonly shippingMethod: Locator;
    readonly saveAddressButton: Locator;
    readonly nextButton: Locator;
    readonly placeOrderButton: Locator;
    readonly thankYouMessage: Locator;
    readonly loginForm: Locator;
    readonly emailInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shippingForm = page.locator('form[class="form form-shipping-address"]');
        this.firstNameInput = this.shippingForm.locator('input[name="firstname"]');
        this.lastNameInput = this.shippingForm.locator('input[name="lastname"]');
        this.companyInput = this.shippingForm.locator('input[name="company"]');
        this.firstAddressInput = this.shippingForm.locator('input[name="street[0]"]');
        this.cityInput = this.shippingForm.locator('input[name="city"]');
        this.stateSelect = this.shippingForm.locator('select[name="region_id"]');
        this.stateInput = this.shippingForm.locator('input[name="region"]');
        this.zipInput = this.shippingForm.locator('input[name="postcode"]');
        this.countrySelect = this.shippingForm.locator('select[name="country_id"]');
        this.telephoneInput = this.shippingForm.locator('input[name="telephone"]');
        this.shippingMethod = page.locator('table[class="table-checkout-shipping-method"]');
        this.nextButton = page.locator('button[class="button action continue primary"]');
        this.placeOrderButton = page.locator('button[class="action primary checkout"]');
        this.thankYouMessage = page.locator('span[data-ui-id="page-title-wrapper"]');
        this.loginForm = page.locator('form[class="form form-login"] >> visible=true');
        this.emailInput = this.loginForm.locator('input[name="username"]');
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillCompany(company: string) {
        await this.companyInput.fill(company);
    }

    async fillFirstAddress(address: string) {
        await this.firstAddressInput.fill(address);
    }

    async fillCity(city: string) {
        await this.cityInput.fill(city);
    }

    async selectState(state: string) {
        await this.stateSelect.selectOption({ label: state });
    }

    async fillState(state: string) {
        await this.stateInput.fill(state);
    }

    async fillZip(zip: string) {
        await this.zipInput.fill(zip);
    }

    async selectCountry(country: string) {
        await this.countrySelect.selectOption({ label: country });
    }

    async fillTelephone(telephone: string) {
        await this.telephoneInput.fill(telephone);
    }

    async fillEmail(email: string) {
        await expect(this.loginForm).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
    }

    async selectShippingMethod() {
        await this.shippingMethod.locator('input[type="radio"]').first().check();
    }

    async fillForm(data: CheckoutDataTypes) {
        if (data.email) {
            await this.fillEmail(data.email);
        }
        if (data.firstName) {
            await this.fillFirstName(data.firstName);
        }
        if (data.lastName) {
            await this.fillLastName(data.lastName);
        }
        if (data.company) {
            await this.fillCompany(data.company);
        }
        if (data.address) {
            await this.fillFirstAddress(data.address);
        }
        if (data.city) {
            await this.fillCity(data.city);
        }
        if (data.state) {
            await this.selectState(data.state);
        }
        if (data.zip) {
            await this.fillZip(data.zip);
        }
        if (data.country) {
            await this.selectCountry(data.country);
        }
        if (data.telephone) {
            await this.fillTelephone(data.telephone);
        }
    }

    async clickNextButton() {
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.nextButton.click();
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.scrollIntoViewIfNeeded();
        await this.placeOrderButton.click();
    }
}