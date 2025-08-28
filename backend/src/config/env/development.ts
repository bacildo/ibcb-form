import { resolve } from "path";
import { DataSourceOptions } from "typeorm";
import { UserEntity } from "../../entities/mongodb/user";
import { MessageEntity } from "../../entities/mongodb/messages";

export const sourcepath = resolve(__dirname, "../../");

export const mongoOptions: DataSourceOptions = {
  type: "mongodb",
  name: "mongodb",
  host: "localhost",
  port: 27017,
  database: "dev",
  useUnifiedTopology: true as any,
  logging: ["error"],
  entities: [UserEntity, MessageEntity],
};

export const configSecret = { secret: "SECRET" };

export const adminSeed = {
  name: "admin",
  password: "admin@123",
  role: "admin" as const,
  mustChangeOnFirstLogin: true,
};

export const webOrigin = { origin: "http://localhost:5173" };

export const databaseEnabled = { mongoOptions: true };

export const serverPort = { port: 3000 };
