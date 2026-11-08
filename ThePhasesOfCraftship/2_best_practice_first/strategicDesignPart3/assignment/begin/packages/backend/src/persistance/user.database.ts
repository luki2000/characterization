import { PrismaClient, User } from "@prisma/client";
import { generateRandomPassword } from "../../shared/utilities/password-generator";
import CreateUserDto from "../view/createUser.dto";

interface UserPersistence {
    getEmail: (email: string) => any;
    getUsername: (username: string) => any;
    addUser: (userData: CreateUserDto) => any;
}

class UserRepository implements UserPersistence{
    constructor(private readonly prisma: PrismaClient) {}
    
    async getEmail(email: string) {
        return await this.prisma.user.findFirst({ where: { email: email }});
    }

    async getUsername(username: string) {
        return await this.prisma.user.findFirst({ where: { username: username }});
    }

    async addUser(userData: CreateUserDto) {
        const { user, member } = await this.prisma.$transaction(async (tx) => {
            const user = await this.prisma.user.create({ data: { ...userData, password: generateRandomPassword(10) } });
            const member = await this.prisma.member.create({ data: { userId: user.id }})
            return { user, member };
          });

        return { user, member};
    }
}

export default UserRepository;