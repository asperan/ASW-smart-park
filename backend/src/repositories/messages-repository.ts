import { mongoClient } from "../services/mongo-client";

export type MessageEntity = {
    type: string,
    isSent: boolean,
    sender: string,
    receiver: string,
    subject: string,
    body: string
}

function formMessageEntity(res: any) {
    return {
        type: res.type,
        isSent: res.isSent,
        sender: res.sender,
        receiver: res.receiver,
        subject: res.subject,
        body: res.body
    }
}

export async function getAllMessages(): Promise<MessageEntity[]> {
    const messagesCollection = mongoClient.db.collection("messages");
    return messagesCollection.find().toArray().then(res => res.map(r => formMessageEntity(r)));
}

export async function getAllUnsentMessages(): Promise<MessageEntity[]> {
    const messagesCollection = mongoClient.db.collection("messages");
    return messagesCollection.find({"isSent": false}).toArray().then(res => res.map(r => formMessageEntity(r)));
}

export function insertMessage(message:MessageEntity) {
    const messagesCollection = mongoClient.db.collection("messages");
    try {
        messagesCollection.insertOne(message);
    } catch(err) {
        console.error("Could not insert mesage " + JSON.stringify(message));
    }
}