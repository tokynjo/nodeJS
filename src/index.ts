import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ContactRoute } from './routes/contact.route';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

class App {

    public app: express.Application; 
    public contactRoute: ContactRoute = new ContactRoute();
    public mongoUrl: string = 'mongodb://localhost/contact_db';

    constructor() {
        this.app = express();
        this.config();     
        this.contactRoute.routes(this.app);        
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ 
            extended: false 
        }));
        // CORS
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "*",
            origin: "*",
            preflightContinue: false
          };
          this.app.use(cors(options));
          this.app.options("*", cors(options));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { 
            useNewUrlParser: true 
        });        
    }

}

const PORT = 2000;

new App().app.listen(PORT, () => {
    console.log('Contact Service listening on port ' + PORT);
});
