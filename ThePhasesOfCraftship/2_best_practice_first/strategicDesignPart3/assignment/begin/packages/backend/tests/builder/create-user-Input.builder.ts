import { CreateUserInput } from "../../../shared/src/api/create-users.input";
import { TextUtil } from "../../../shared/src/utils/textUtils";


class CreateUserInputBuilder  {
    private props: Partial<CreateUserInput>;

    constructor() {
        this.props = {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
        }
    }

    public withRandomDetails() {
        this.withEmail(TextUtil.createRandomEmail());
        this.withFirstName(TextUtil.createRandomText(10));
        this.withLastName(TextUtil.createRandomText(15));
        this.withUsername(TextUtil.createRandomText(6));
        return this;
    }

    withEmail(email: string) {
        this.props = {
            ...this.props,
            email,
        };
        return this;
    }

    withFirstName(firstName: string) {
        this.props = {
            ...this.props,
            firstName,
        };
        return this;
    }

    withLastName(lastName: string) {
        this.props = {
            ...this.props,
            lastName,
        };
        return this;
    }

    withUsername(username: string) {
        this.props = {
            ...this.props,
            username,
        }
        return this;
    }

    public build(): Partial<CreateUserInput> {
        return this.props;
    }
}

export default CreateUserInputBuilder;