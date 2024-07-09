import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configSecret } from "../config";
import { UserRepository } from "../repositories/noSql/user";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository = new UserRepository();

  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: "Invalid token" });
    return;
  }
  const parts = authorization?.split(" ");
  if (parts?.length !== 2) {
    res.status(401).send({ message: "Invalid token" });
    return;
  }
  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)) {
    res.status(401).send({ message: "Invalid token" });
    return;
  }
  try {
    const decoded = jwt.verify(token, configSecret.secret) as {
      id: string;
    };
    const user = await userRepository.findUserById(decoded.id);
    if (!user) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
}
