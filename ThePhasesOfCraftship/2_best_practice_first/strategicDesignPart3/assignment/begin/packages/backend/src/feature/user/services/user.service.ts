import UserRepository from "../persistance/user.database";
import { EmailAlreadyInUse, UserNotFound, UserNameAlreadyInUse } from "../../../shared/errors";
import CreateUserDto from "../view/createUser.dto";
import GetUserbyEmailDto from "../view/getUserByEmail.dto";
import { User } from "@dddforum/shared/src/models/user";

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

    async getUserByEmail(UserData: GetUserbyEmailDto) {
          
          const user = await this.db.getUserByEmail(UserData.email);
          if (!user) {
            throw new UserNotFound();
          }
        return user;
    }
}

export default UserService;