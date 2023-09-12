import express, { Application } from 'express';
import cors from 'cors';
import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import compression from 'compression';
import mysql from 'mysql2/promise';

class App{
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number){
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void{

        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());

    }

    private initializeControllers(controllers: Controller[]): void{
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void{
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void{
        // Database connection
        const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

        mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        }).then(() => console.log('Database connected!'))
    }

    public listen(): void{
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;