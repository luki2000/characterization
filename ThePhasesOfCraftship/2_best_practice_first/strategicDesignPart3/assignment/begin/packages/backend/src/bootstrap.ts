import { UserController } from './feature/user/controllers/user.controller';
import { prisma } from './database';
import UserRepository from './feature/user/persistance/user.database';
import Server from './server';
import UserService from './feature/user/services/user.service';
import { ErrorHandler } from './shared/errors';
import { MarketingController } from './feature/marketing/controller/marketing.controller';
import { MarketingService } from './feature/marketing/service/marketing.service';
import { ContactListAPI } from './feature/marketing/service/contactListAPI';

// const errorExceptionHandler = new ErrorExceptionHandler();

const userDatabase = new UserRepository(prisma);
const userService = new UserService(userDatabase);
const userController = new UserController(userService, ErrorHandler);

const contactListAPI = new ContactListAPI();
const marketingService = new MarketingService(contactListAPI);
const marketingController = new MarketingController(marketingService, ErrorHandler);

const server = new Server(
    userController,
    marketingController,
);

export default server;