import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Res,
  UseBefore,
  Put,
} from "routing-controllers";
import { Response } from "express";
import { Service } from "typedi";
import { TransactionEntity } from "../entities";
import { TransactionService } from "../service";
import { validateToken } from "../middlewares";

@Service()
@JsonController()
export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  @Get("/")
  @UseBefore(validateToken)
  public async getAllTransactionsById(@Res() res: Response): Promise<Response> {
    const { _id: id } = res.locals.user;
    try {
      const transactions =
        await this.transactionService.findAllTransactionsByUser(id);
      return res.status(201).send(transactions);
    } catch (error) {
      return res.status(401).send({ message: "Transaction not found!" });
    }
  }

  @Post("/")
  @UseBefore(validateToken)
  public async createTransaction(
    @Body() transact: TransactionEntity,
    @Res() res: Response
  ): Promise<any> {
    const { _id: id } = res.locals.user;
    try {
      const transaction = await this.transactionService.registerTransaction(
        transact,
        id
      );
      return res.status(201).send(transaction);
    } catch (error) {
      return res.status(401).send({ message: "Transaction register failed!" });
    }
  }

  @Put("/:id")
  @UseBefore(validateToken)
  public async updateTransaction(
    @Param("id") id: string,
    @Body() body: TransactionEntity,
    @Res() res: Response
  ): Promise<Response> {
    const { _id: userId } = res.locals.user;
    const userIdToString = userId.toString();
    try {
      await this.transactionService.editTransaction(id, body, userIdToString);
      return res.send({ message: "success!" });
    } catch (error) {
      return res.status(500).send({ message: "Transaction update failed!" });
    }
  }
  @Delete("/:id")
  @UseBefore(validateToken)
  public async deleteTransaction(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<Response> {
    const { _id: userId } = res.locals.user;
    const userIdToString = userId.toString();
    try {
      await this.transactionService.deleteTransaction(id, userIdToString);
      return res.send({ message: "success!" });
    } catch (error) {
      return res.status(500).send({ message: "Transaction delete failed!" });
    }
  }
}
