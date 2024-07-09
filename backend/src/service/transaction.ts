import { Service } from "typedi";
import { TransactionEntity } from "../entities";
import { TransactionRepository } from "../repositories/noSql/transaction";

@Service()
export class TransactionService {
  private repository: TransactionRepository;

  constructor() {
    this.repository = new TransactionRepository();
  }

  async registerTransaction(
    body: TransactionEntity,
    id: string
  ): Promise<TransactionEntity> {
    if (!id) throw new Error("User id is required!");
    return await this.repository.createTransaction({
      ...body,
      userId: id,
    });
  }

  async findAllTransactionsByUser(id: string): Promise<TransactionEntity[]> {
    if (!id) throw new Error("User id is required!");
    return await this.repository.findAllTransactionsByUser(id);
  }
  async editTransaction(
    id: string,
    body: TransactionEntity,
    userId: string
  ): Promise<TransactionEntity> {
    const transactionFromUser = await this.repository.findTransactionById(id);

    if (!transactionFromUser) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    if (userId !== transactionFromUser.userId.toString())
      throw new Error("The transaction isnt yours!");
    return await this.repository.editTransaction(id, body);
  }

  async deleteTransaction(
    id: string,
    userId: string
  ): Promise<TransactionEntity> {
    const transactionFromUser = await this.repository.findTransactionById(id);

    if (!transactionFromUser) {
      throw new Error(`Transaction with id ${id} not found`);
    }
    console.log("userIdFromTransaction", transactionFromUser.userId);
    console.log("userIdFromService", userId);

    if (userId !== transactionFromUser.userId.toString())
      throw new Error("The transaction isnt yours!");

    return await this.repository.deleteTransaction(id);
  }
}
