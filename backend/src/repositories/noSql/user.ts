import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Service } from "typedi";
import { configSecret } from "../../config";
import { UserEntity } from "../../entities/mongodb/user";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class UserRepository extends Abstract<UserEntity> {
  constructor() {
    super(Database.mongo, UserEntity);
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    try {
      return await this.mongoRepository.findOne({ where: { _id: new ObjectId(id) } });
    } catch (error) {
      throw new Error(`${error}, User not found`);
    }
  }

  async findUserByName(name: string): Promise<UserEntity | null> {
    try {
      return await this.mongoRepository.findOne({ where: { name } });
    } catch (error) {
      throw new Error(`${error}, User not found`);
    }
  }

  async generateToken(id: string, role: string, opts?: { firstLogin?: boolean }): Promise<string> {
    const expiresIn = opts?.firstLogin ? "15m" : "2h";
    const mcp = !!opts?.firstLogin;
    return jwt.sign({ id, role, mcp }, configSecret.secret, { expiresIn });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.mongoRepository.save(user);
    } catch (error) {
      throw new Error(`${error}, User not created`);
    }
  }

  async editUser(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const updatedUser = await this.mongoRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnDocument: "after" }
      );
      if (!updatedUser || updatedUser.value === null) {
        throw new Error(`User with id ${id} not found`);
      }
      return updatedUser.value;
    } catch (error) {
      throw new Error(`${error}, User not updated`);
    }
  }

  async deleteUser(id: ObjectId): Promise<string | void> {
    const result = await this.mongoRepository.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error(`User with id ${id} not found`);
    return `User with id ${id} deleted successfully`;
  }

  async updateUserRole(id: string, role: string): Promise<UserEntity> {
    const updatedUser = await this.mongoRepository.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { role } },
      { returnDocument: "after" }
    );
    if (!updatedUser || updatedUser.value === null) throw new Error(`User with id ${id} not found`);
    return updatedUser.value;
  }
}
