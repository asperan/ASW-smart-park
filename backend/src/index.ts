import express from 'express';
import cors from 'cors';
import { initMongoClient } from './services/mongo-client';
import { loadConfig, getConfig } from './services/config'
import cityRoutes from "./routes/city-routes";
import parkingRoutes from "./routes/parking-routes";
import messageRoutes from "./routes/message-routes"
import authRoutes from "./routes/auth-routes";
import beaconRoutes from "./routes/beacon-routes";
import reviewsRoutes from "./routes/reviews-routes";
import { setSignupRoutes } from "./routes/signup-routes";
import { setSigninRoutes } from './routes/signin-routes';
import { setUserInfoRoutes } from './routes/user-info-routes';

const app = express();

main();

function main() {
    initConfig();
    connectToMongoDB();
    configureMiddleware();
    configureRoutes();
    startServer();
}

function initConfig() {
    loadConfig();
}

function connectToMongoDB() {
    const username = getConfig().db.username;
    const password = getConfig().db.password;
    const host = getConfig().db.host;
    const port = getConfig().db.port;
    const dbName = getConfig().db.name;

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
    app.use('/api/messages', messageRoutes)
    app.use('/api/auth', authRoutes);
    app.use('/api/beacon', beaconRoutes);
    app.use('/api/reviews', reviewsRoutes)
    setSignupRoutes(app);
    setSigninRoutes(app);
    setUserInfoRoutes(app);
}

function startServer() {
    app.listen(getConfig().server.port, () => {
        console.log("Listening on port " + getConfig().server.port);
    });
}