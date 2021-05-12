import MongoClient, { Db, Decimal128 } from "mongodb";

class MongoWrapper {

    dbName!: string;
    db!: Db;

    constructor(uri: string, dbName: string) {
        this.dbName = dbName;
        const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
        MongoClient.connect(uri, connectionOptions).then(client => this.onConnection(client));
    }

    onConnection(client: MongoClient.MongoClient) {
        this.db = client.db(this.dbName);
    }
}

export let mongoClient: MongoWrapper;

export function initMongoClient(uri: string, dbName: string): void {
    mongoClient = new MongoWrapper(uri, dbName);
}