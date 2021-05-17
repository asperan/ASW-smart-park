import MongoClient, { Db, Decimal128 } from "mongodb";

class MongoWrapper {

    db!: Db;

    constructor(uri: string, dbName: string) {
        const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
        MongoClient.connect(uri, connectionOptions).then(client => this.onConnection(client, dbName));
    }

    onConnection(client: MongoClient.MongoClient, dbName: string) {
        this.db = client.db(dbName);
    }
}

export let mongoClient: MongoWrapper;

export function initMongoClient(uri: string, dbName: string): void {
    mongoClient = new MongoWrapper(uri, dbName);
}