import { UserController } from './controllers/user.controller';
import { prisma } from './database';
import UserRepository from './persistance/user.database';
import Server from './server';
import UserService from './services/user.service';
import { ErrorHandler } from './shared/errors';

// const errorExceptionHandler = new ErrorExceptionHandler();

//const studentDatabase = new StudentDatabase(prisma);
//const studentService = new StudentService(studentDatabase);
//const studentController = new StudentController(studentService, errorExceptionHandler);
const userDatabase = new UserRepository(prisma);
const userService = new UserService(userDatabase);
const userController = new UserController(userService, ErrorHandler);


const server = new Server(
    userController,
);

export default server;