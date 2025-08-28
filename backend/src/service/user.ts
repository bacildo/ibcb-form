import { Service } from "typedi";
import bcrypt from "bcrypt";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";

@Service()
export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(body: UserEntity): Promise<UserEntity> {
    const hashed = bcrypt.hashSync(body.password, 10);
    const existing = await this.repository.findUserByName(body.name);
    if (existing) throw new Error("User already exists");

    const user: any = {
      name: body.name,
      password: hashed,
      role: body.role || "admin",
      mustChangePassword: true,
      created_at: new Date(),
    };
    return await this.repository.createUser(user);
  }

  async loginUser(name: string, password: string): Promise<{ token: string; mustChangePassword: boolean }> {
    const userVerify = await this.repository.findUserByName(name);
    if (!userVerify) throw new Error("Name incorrect!");

    const ok = bcrypt.compareSync(password, userVerify.password);
    if (!ok) throw new Error("Password incorrect!");

    const token = await this.repository.generateToken(userVerify._id.toString(), userVerify.role, {
      firstLogin: Boolean((userVerify as any).mustChangePassword),
    });
    return { token, mustChangePassword: Boolean((userVerify as any).mustChangePassword) };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<{ ok: boolean; token: string }> {
    const user = await this.repository.findUserById(userId);
    if (!user) throw new Error("User not found");

    const ok = bcrypt.compareSync(oldPassword, user.password);
    if (!ok) throw new Error("Senha atual incorreta");
    if (!newPassword || newPassword.length < 8) throw new Error("Nova senha muito curta");

    const hashed = bcrypt.hashSync(newPassword, 10);
    const updated = await this.repository.editUser(String(user._id), {
      password: hashed,
      mustChangePassword: false,
      passwordUpdatedAt: new Date(),
    } as any);

    const token = await this.repository.generateToken(String(updated._id), updated.role);
    return { ok: true, token };
  }
}
