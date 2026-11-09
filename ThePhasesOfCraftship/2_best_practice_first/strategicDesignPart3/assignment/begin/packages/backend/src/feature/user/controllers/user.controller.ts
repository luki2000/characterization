import express from "express";
import { parseUserForResponse } from "../../../../shared/utilities/parser";
import { ErrorHandler } from "../../../shared/errors";
import CreateUserDto from "../view/createUser.dto";
import UserService from "../services/user.service";
import GetUserbyEmailDto from "../view/getUserByEmail.dto";


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
        this.router.post('/new', this.createUser.bind(this));
        this.router.get('/', this.getUserByEmail.bind(this));

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
              const { user } = await this.userService.createUser(dto);
              return res.status(201).json({
                success: true,
                data: parseUserForResponse(user),
                error: {},
              });
         } catch(error) {
             next(error);
         }
     }

     private async getUserByEmail(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

        try {
            const dto = GetUserbyEmailDto.fromRequest(req.query);
            const user  = await this.userService.getUserByEmail(dto);
            return res.status(201).json({
              success: true,
              data: parseUserForResponse(user),
              error: {},
            });
       } catch(error) {
           next(error);
       }

    }


}