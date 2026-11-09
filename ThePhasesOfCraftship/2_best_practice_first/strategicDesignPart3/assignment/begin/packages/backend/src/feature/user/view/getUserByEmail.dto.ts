import { isMissingKeys } from '../../../../shared/utilities/input-validation';
import { InvalidRequestBodyException } from '../../../shared/errors';

class GetUserbyEmailDto {
    constructor(
        public email: string,
    ) {}

    static fromRequest(query: unknown) {
        const requiredKeys = ['email'];

        const hasAllKeys = !isMissingKeys(query, requiredKeys);
        const isValidRequest = query && typeof query === 'object' && hasAllKeys;
        if(!isValidRequest) {
            throw new InvalidRequestBodyException(requiredKeys);
        }

        const { email } = query as { email: string};

       return new GetUserbyEmailDto(email);
    }
}

export default GetUserbyEmailDto;