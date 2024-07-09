import {
  Body,
  Get,
  JsonController,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import { validateToken } from "../middlewares";
import { Service } from "typedi";
import { UserEntity } from "../entities";
import { UserService } from "../service";
import { ILogin } from "../interfaces";

@Service()
@JsonController()
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get("/me")
  @UseBefore(validateToken)
  public async userLogged(@Res() res: Response): Promise<Response> {
    const { _id: id } = res.locals.user;

    try {
      const me = await this.userService.loggedUser(id);
      return res.status(201).send(me);
    } catch (error) {
      return res.status(401).send({ message: "User not found!" });
    }
  }

  @Post("/register")
  public async registerUser(@Body() user: UserEntity): Promise<UserEntity> {
    if (Object.keys(user).length == 0) {
      throw new Error("Please inform the user data");
    } else {
      return await this.userService.registerUser(user);
    }
  }

  @Post("/user-login")
  public async loginUser(
    @Body() user: ILogin,
    @Res() res: Response
  ): Promise<any> {
    try {
      const token = await this.userService.loginUser(user.name, user.password);
      return res.status(201).send(token);
    } catch (error) {
      return res.status(401).send(error);
    }
  }
}
