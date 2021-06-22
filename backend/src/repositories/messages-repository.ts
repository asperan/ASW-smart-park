import { mongoClient } from "../services/mongo-client";

export type MessageEntity = {
    type: string,
    isSent: boolean,
    sender: string,
    receiver: string,
    subject: string,
    body: string
}

export class MessagesRepository {

    constructor() {

    }

    public async getAllMessages(): Promise<MessageEntity[]> {
        const messagesCollection = mongoClient.db.collection("messages");
        return messagesCollection.find().toArray().then(res => res.map(r => this.formMessageEntity(r)));
    }
    
    public async getAllUnsentMessages(): Promise<MessageEntity[]> {
        const messagesCollection = mongoClient.db.collection("messages");
        return messagesCollection.find({"isSent": false}).toArray().then(res => res.map(r => this.formMessageEntity(r)));
    }
    
    public insertMessage(message:MessageEntity) {
        const messagesCollection = mongoClient.db.collection("messages");
        try {
            messagesCollection.insertOne(message);
        } catch(err) {
            console.error("Could not insert mesage " + JSON.stringify(message));
        }
    }

    private formMessageEntity(res: any) {
        return {
            type: res.type,
            isSent: res.isSent,
            sender: res.sender,
            receiver: res.receiver,
            subject: res.subject,
            body: res.body
        }
    }

}

export const messagesRepository: MessagesRepository = new MessagesRepository();