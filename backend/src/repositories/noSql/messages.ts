import { Service } from "typedi";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";
import { MessageEntity } from "../../entities";
import { ObjectId } from "mongodb";

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

  async deleteMessage(id: string): Promise<any> {
    try {
      const result = await this.mongoRepository.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        throw new Error(`Message with id ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new Error(`${error}, Message not deleted`);
    }
  }
}
