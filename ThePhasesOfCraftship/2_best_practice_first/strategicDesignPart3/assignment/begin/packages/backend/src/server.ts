import express, { Express } from 'express';
import { UserController } from './feature/user/controllers/user.controller';
import { MarketingController } from './feature/marketing/controller/marketing.controller';

const cors = require('cors');

class Server {

        private app: Express;
    
        constructor(
            private readonly userController: UserController,
            private readonly marketingController: MarketingController) {
                this.app = express();
                this.setupMiddleware();
                this.setupRoutes();
            }

        private setupMiddleware() {
            this.app.use(express.json());
            this.app.use(cors());
        }

        private setupRoutes() {
            this.app.use('/users', this.userController.getRouter());
            this.app.use('/marketing', this.marketingController.getRouter());
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