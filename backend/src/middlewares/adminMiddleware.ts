import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/noSql/user";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository = new UserRepository();
  const { user } = res.locals;

  if (!user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const foundUser = await userRepository.findUserById(user._id);
  if (!foundUser || foundUser.role !== 'admin') {
    res.status(403).send({ message: "Forbidden" });
    return;
  }

  next();
}
