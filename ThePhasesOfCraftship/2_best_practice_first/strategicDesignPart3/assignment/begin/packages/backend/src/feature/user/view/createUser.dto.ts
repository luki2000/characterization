import { isMissingKeys } from '../../../../shared/utilities/input-validation';
import { User } from '../../../../../shared/src/models/user';
import { InvalidRequestBodyException } from '../../../shared/errors';

class CreateUserDto implements User {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public username: string,
    ) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ['email', 'firstName', 'lastName', 'username'];

        const hasAllKeys = !isMissingKeys(body, requiredKeys);
        const isValidRequest = body && typeof body === 'object' && hasAllKeys;
        if(!isValidRequest) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { email, firstName, lastName, username } = body as User;

       return new CreateUserDto(email, firstName, lastName, username);
    }
}

export default CreateUserDto;