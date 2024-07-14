import {
  JsonController,
  Get,
  Post,
  Body,
  UseBefore,
  Res,
  Delete,
  Param,
} from "routing-controllers";
import { Response } from "express";
import { MessageEntity } from "../entities";
import { MessageService } from "../service";
import { validateToken } from "../middlewares";
import { adminMiddleware } from "../middlewares";

@JsonController("/messages")
export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  @Post("/")
  public async createMessage(
    @Body() messageData: MessageEntity,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const newMessage = await this.messageService.createMessage(messageData);
      return res.status(201).send(newMessage);
    } catch (error) {
      return res.status(500).send({ message: "Failed to create message" });
    }
  }

  @Get("/")
  @UseBefore(validateToken, adminMiddleware)
  public async getAllMessages(@Res() res: Response): Promise<Response> {
    try {
      const messages = await this.messageService.getAllMessages();
      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).send({ message: "Failed to retrieve messages" });
    }
  }

  @Delete("/:id")
  @UseBefore(validateToken)
  public async deleteMessage(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      await this.messageService.deleteMessage(id);
      return res.send({ message: "success!" });
    } catch (error) {
      return res.status(500).send({ message: "Transaction delete failed!" });
    }
  }
}
