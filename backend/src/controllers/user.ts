import { Body, JsonController, Post, Res, UseBefore } from "routing-controllers";
import { Response } from "express";
import { Service } from "typedi";
// import { UserEntity } from "../entities";
import { UserService } from "../service";
import { validateToken } from "../middlewares";

@Service()
@JsonController()
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post("/user-login")
  public async loginUser(@Body() user: { name: string; password: string }, @Res() res: Response): Promise<any> {
    try {
      const result = await this.userService.loginUser(user.name, user.password);
      return res.status(201).send(result); // { token, mustChangePassword }
    } catch (error) {
      return res.status(401).send({ message: String(error) });
    }
  }

  @Post("/change-password")
  @UseBefore(validateToken)
  public async changePassword(@Body() body: { oldPassword: string; newPassword: string }, @Res() res: Response) {
    try {
      const result = await this.userService.changePassword(res.locals.user._id, body.oldPassword, body.newPassword);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send({ message: String(error) });
    }
  }
}
