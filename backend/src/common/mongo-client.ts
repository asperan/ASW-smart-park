import MongoClient from "mongodb";

class MongoWrapper {

    db: any;

    constructor() {

    }

    async connect(uri: string, dbName: string) {
        await new Promise((resolve, reject) => {
            MongoClient.connect(
                uri,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (error: any, client: any) => {
                    if (error) {
                        reject(error)
                    }

                    console.log("Connected successfully to Mongodb");

                    this.db = client.db(dbName);
                    resolve(this.db);
                }
            );
        }).catch((error) => { throw error});
    }
}

export let MongoConnection = new MongoWrapper();