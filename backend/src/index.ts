import express from 'express';
import cors from 'cors';
import { MongoConnection } from './common/mongo-client';
import { mainModule } from 'node:process';

const app = express();
const cityRoutes = require('./routes/city-routes');
const parkingRoutes = require('./routes/parking-routes');

const PORT = 3000;
const DB_URI = "";
const DB_NAME = "";

main();

function main() {
    connectToMongoDB();
    configureMiddleware();
    configureRoutes();
    startServer();
}

function connectToMongoDB() {
    MongoConnection.connect(DB_URI, DB_NAME);
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
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });
}