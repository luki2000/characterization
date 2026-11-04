import express from "express";
import { ErrorHandler } from "../shared/errors";


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
                const keyIsMissing = isMissingKeys(req.body, 
                  ['email', 'firstName', 'lastName', 'username']
                );
                // replace by Dto
                if (keyIsMissing) {
                  return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
                }
            
                const userData = req.body;
                
                // use userService
                const existingUserByEmail = await prisma.user.findFirst({ where: { email: req.body.email }});
                if (existingUserByEmail) {
                  return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
                }
            
                // use userService
                const existingUserByUsername = await prisma.user.findFirst({ where: { username: req.body.username as string }});
                if (existingUserByUsername) {
                  return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
                }
            
                // use userServices
                const { user, member } = await prisma.$transaction(async (tx) => {
                  const user = await prisma.user.create({ data: { ...userData, password: generateRandomPassword(10) } });
                  const member = await prisma.member.create({ data: { userId: user.id }})
                  return { user, member }
                })
 
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