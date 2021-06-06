import * as messagesRepository  from "../repositories/messages-repository";
import { MessageEntity } from "../repositories/messages-repository";

export async function getAllMessages(): Promise<MessageEntity[]> {
    return await messagesRepository.getAllMessages();
}

export async function getAllUnsentMessages(): Promise<MessageEntity[]> {
    return await messagesRepository.getAllUnsentMessages();
}

export function insertMessage(message: MessageEntity) {
    messagesRepository.insertMessage(message);
}