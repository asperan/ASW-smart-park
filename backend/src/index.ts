import express from 'express';
import cors from 'cors';
import { MongoConnection } from './common/mongo-client';
import { mainModule } from 'node:process';

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
    MongoConnection.connect(config.db.url, config.db.name);
}

function configureMiddleware() {
    app.use(express.json());
    app.use(cors());
}

function configureRoutes() {
    app.use('/api/city', cityRoutes);
    app.use('/api/parking', parkingRoutes);
}

function startServer() {
    app.listen(config.server.port, () => {
        console.log("Listening on port " + config.server.port);
    });
}