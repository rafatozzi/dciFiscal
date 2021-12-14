import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AppError } from "../../../errors/AppError";

export async function EnsureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const userRepository = new UsersRepositories();

  const user = await userRepository.findById(id);

  if (!user.admin)
    throw new AppError("Usuário sem permissão");

  next();
}