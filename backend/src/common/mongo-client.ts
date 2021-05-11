import MongoClient, { Db, InsertOneWriteOpResult } from "mongodb";

class MongoWrapper {

    db!: Db;

    constructor(uri: string, dbName: string) {
        const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
        MongoClient.connect(uri, connectionOptions).then(client => this.db = client.db(dbName));
    }
}

let client: MongoWrapper;

export function initMongoClient(uri: string, dbName: string): void {
    client = new MongoWrapper(uri, dbName);
}

// Db-related functions:
//
// insertUser
// ...
export async function isUserAlreadyPresent(email: string): Promise<boolean> {
    return await client.db.collection("users").countDocuments({email: email}) > 0;
}

export async function insertUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
    return await client.db.collection("users").insertOne({email: email, password: hashedPassword, salt: salt});
}