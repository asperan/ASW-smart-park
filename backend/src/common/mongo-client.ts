import MongoClient, { Db } from "mongodb";

class MongoWrapper {

    db!: Db;

    constructor(uri: string, dbName: string) {
        const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
        MongoClient.connect(uri + "/" + dbName, connectionOptions).then(client => this.db = client.db());
    }
}

export let mongoClient: MongoWrapper;

export function initMongoClient(uri: string, dbName: string): void {
    mongoClient = new MongoWrapper(uri, dbName);
}


