import * as messagesRepository from "../repositories/messages-repository";
import { MessageEntity } from "../repositories/messages-repository";

export async function getAllMessages(): Promise<any[]> {
    const messages = await messagesRepository.getAllMessages();
    return messages.map((m: MessageEntity) => makeDtoFromMessage(m));
}

export async function getAllUnsentMessages(): Promise<any[]> {
    const messages = await messagesRepository.getAllUnsentMessages();
    return messages.map((m: MessageEntity) => makeDtoFromMessage(m));
}

export function insertMessage(message: MessageEntity) {
    messagesRepository.insertMessage(message);
}

function makeDtoFromMessage(message: MessageEntity) {
    return message;
}