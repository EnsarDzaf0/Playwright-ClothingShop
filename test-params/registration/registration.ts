import { generateRandomEmail } from '../../utils/emailUtils';
import { formDataTypes } from '../../interfaces/registration';

export const validInputs: formDataTypes = {
    firstName: 'John',
    lastName: 'Doe',
    email: generateRandomEmail(),
    password: 'Password123',
    confirmPassword: 'Password123'
}
