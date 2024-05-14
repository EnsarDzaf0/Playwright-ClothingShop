import { generateRandomEmail } from '../../utils/emailUtils';

export const registrationParams = {
    registrationLink: 'https://magento.softwaretestingboard.com/customer/account/create/',
    registrationPageTitle: 'Create New Customer Account',
    registrationFormLocator: 'form[id="form-validate"]',
    registrationFormFields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'input[id="password"]',
        passwordConfirmation: 'Confirm Password',
        submitButton: 'Create an Account'
    },
    passwordError: {
        locator: 'div[id="password-error"]',
        shortError: 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.',
        classError: 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.',
    },
    confirmPasswordError: {
        locator: 'div[id="password-confirmation-error"]',
        error: 'Please enter the same value again.'
    },
    emailError: {
        locator: 'div[id="email_address-error"]',
        error: 'Please enter a valid email address (Ex: johndoe@domain.com).'
    },
    errorMessageBox: {
        error: 'First Name is not valid! Last Name is not valid!'
    },
    firstNameError: {
        locator: 'div[id="firstname-error"]',
    },
    requiredFieldMessage: 'This is a required field.'
}

export const validInputs = {
    firstName: 'John',
    lastName: 'Doe',
    email: generateRandomEmail(),
    password: 'Password123',
    confirmPassword: 'Password123'
}

export const invalidInputs = {
    password: {
        short: 'pas',
        oneClass: 'password',
    },
    firstName: '_:#!@',
    lastName: '_:#!@',
    email: 'test.com',
}