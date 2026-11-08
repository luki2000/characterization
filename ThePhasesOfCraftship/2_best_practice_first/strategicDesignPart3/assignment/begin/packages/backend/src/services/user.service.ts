import UserRepository from "../persistance/user.database";
import { EmailAlreadyInUse, UserNameAlreadyInUse } from "../shared/errors";
import CreateUserDto from "../view/createUser.dto";

class UserService {
    constructor(private db: UserRepository) {}

    async createUser(userData: CreateUserDto) {
        const { email, username } = userData;
        const existingUserByEmail = await this.db.getEmail(email);
        if (existingUserByEmail) {
            throw new EmailAlreadyInUse();
        }
    
        const existingUserByUsername = await this.db.getUsername(username);
        if (existingUserByUsername) {
          throw new UserNameAlreadyInUse();
        }
    
        return await this.db.addUser(userData);
    }

    getUserByEmail(email: string): void {

    }
}

export default UserService;