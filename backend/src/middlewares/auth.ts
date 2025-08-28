import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configSecret } from "../config";
import { UserRepository } from "../repositories/noSql/user";

export async function validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers;
  if (!authorization) return void res.status(401).send({ message: "Invalid token" });

  const [schema, token] = authorization.split(" ");
  if (schema !== "Bearer" || !token) {
    return void res.status(401).send({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, configSecret.secret) as { id: string; role: string };
    const repo = new UserRepository();
    const user = await repo.findUserById(decoded.id);
    if (!user) return void res.status(401).send({ message: "Invalid token" });

    res.locals.user = { _id: user._id, role: user.role, mustChangePassword: (user as any).mustChangePassword };
    next();
  } catch {
    res.status(401).send({ message: "Invalid token" });
  }
}
