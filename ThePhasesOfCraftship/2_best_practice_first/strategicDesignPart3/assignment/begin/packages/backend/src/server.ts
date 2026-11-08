import express, { Express } from 'express';
import { UserController } from './controllers/user.controller';

const cors = require('cors');

class Server {

        private app: Express;
    
        constructor(
            private readonly userController: UserController) {
                this.app = express();
                this.setupMiddleware();
                this.setupRoutes();
            }

        private setupMiddleware() {
            this.app.use(express.json());
            this.app.use(cors());
        }

        private setupRoutes() {
            this.app.use('/students', this.userController.getRouter());
        }

        getApp() {
            return this.app;
        }

        start(port: number) {
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
        
}


export default Server;