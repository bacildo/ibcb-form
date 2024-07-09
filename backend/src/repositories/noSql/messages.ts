import { Service } from "typedi";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";
import { MessageEntity } from "../../entities"
@Service()
export class MessageRepository extends Abstract<MessageEntity> {
  constructor() {
    super(Database.mongo, MessageEntity);
  }

  async findAllMessages(): Promise<MessageEntity[]> {
    return await this.mongoRepository.find();
  }

  async createMessage(message: MessageEntity): Promise<MessageEntity> {
    return await this.mongoRepository.save(message);
  }
}
