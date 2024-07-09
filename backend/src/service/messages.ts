import { Service } from "typedi";
import { MessageRepository } from "../repositories";
import { MessageEntity } from "../entities";

@Service()
export class MessageService {
private repository: MessageRepository

  constructor() {
    this.repository = new MessageRepository();
  }

  async createMessage(messageData: MessageEntity): Promise<MessageEntity> {
    return await this.repository.createMessage(messageData);
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.repository.findAllMessages();
  }
}
