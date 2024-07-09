import { Service } from "typedi";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";
import bcrypt from "bcrypt";

@Service()
export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(body: UserEntity): Promise<UserEntity> {
    const passwordVerify = bcrypt.hashSync(body.password, 10);
    const userVerify = await this.repository.findUserByName(body.name);

    if (userVerify) throw new Error("User already exists!");

    return await this.repository.createUser({
      ...body,
      password: passwordVerify,
    });
  }

  async loggedUser(id: string) {
    const user = await this.repository.findUserById(id);
    if (!user) throw new Error("User not found!");
    return user;
  }

  async loginUser(name: string, password: string): Promise<string> {
    const userVerify = await this.repository.findUserByName(name);
    if (!userVerify) {
      throw new Error("Name incorrect!");
    }

    const passwordVerify = bcrypt.compareSync(password, userVerify.password);
    if (!passwordVerify) {
      throw new Error("Password incorrect!");
    }

    return await this.repository.generateToken(userVerify._id.toString(), userVerify.role);
  }
}
