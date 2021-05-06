import express from 'express';
import cors from 'cors';
import { initMongoClient } from './common/mongo-client';
import cityRoutes from "./routes/city-routes";
import parkingRoutes from "./routes/parking-routes";

const app = express();

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
    initMongoClient(connectionString, dbName);
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