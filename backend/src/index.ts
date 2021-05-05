import express from 'express';
import cors from 'cors';
import { MongoConnection } from './common/mongo-client';
import { mainModule } from 'node:process';
import { setSignupRoutes } from './routes/signup-routes';

const app = express();
const cityRoutes = require('./routes/city-routes');
const parkingRoutes = require('./routes/parking-routes');

const config = require('../config/config.json');

main();

function main() {
    connectToMongoDB();
    configureMiddleware();
    configureRoutes();
    startServer();
}

function connectToMongoDB() {
    const username = config.db.username;
    const password = config.db.password;
    const host = config.db.host;
    const port = config.db.port;
    const dbName = config.db.name;

    const connectionString = `mongodb://${username}:${password}@${host}:${port}`;
    MongoConnection.connect(connectionString, dbName);
}

function configureMiddleware() {
    app.use(express.json());
    app.use(cors());
}

function configureRoutes() {
    app.use('/api/city', cityRoutes);
    app.use('/api/parking', parkingRoutes);
    setSignupRoutes(app);
}

function startServer() {
    app.listen(config.server.port, () => {
        console.log("Listening on port " + config.server.port);
    });
}