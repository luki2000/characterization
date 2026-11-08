import express from "express";
import { ErrorHandler } from "../../../shared/errors";
import CreateUserDto from "../view/createUser.dto";
import UserService from "../services/user.service";


export class UserController {
    private router: express.Router;
    constructor(
        private userService: UserService,
        private errorHandler: typeof ErrorHandler,
    ) {
        this.router  = express.Router();
        this.setupRoutes();
        this.setupErrorHandler();
    }

    getRouter() {
        return this.router;
    }

    private setupRoutes() {
        this.router.post('/users/new', this.createUser.bind(this));
        this.router.get('/users', this.getUserByEmail.bind(this));

    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler);
     }
 
     private async createUser(
         req: express.Request,
         res: express.Response,
         next: express.NextFunction
     ) {
            try {

               const dto = CreateUserDto.fromRequest(req.body);
            
              const userData = dto;

              const response = await this.userService.createUser(userData);

 
             return res.status(201).json(response);
         } catch(error) {
             next(error);
         }
     }

     private async getUserByEmail(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

    }


}