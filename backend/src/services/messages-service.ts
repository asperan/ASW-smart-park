import { messagesRepository } from "../repositories/messages-repository";
import { MessageEntity } from "../repositories/messages-repository";

export class MessagesService {

  constructor() {

  }

  public async getAllMessages(): Promise<MessageEntity[]> {
    return await messagesRepository.getAllMessages();
  }

  public async getAllUnsentMessages(): Promise<MessageEntity[]> {
    return await messagesRepository.getAllUnsentMessages();
  }

  public insertMessage(message: MessageEntity) {
    messagesRepository.insertMessage(message);
  }
}

export const messagesService: MessagesService = new MessagesService();