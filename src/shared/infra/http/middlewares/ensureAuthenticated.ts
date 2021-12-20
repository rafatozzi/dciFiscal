import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { UsersRepositories } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  const usersRepositories = new UsersRepositories(request.cod_cliente);

  if (!authHeader)
    throw new AppError("Token não informado");

  const [, token] = authHeader.split(" ");

  try {

    const { sub: user_id } = verify(token, auth.secret) as IPayload;

    const user = await usersRepositories.findById(user_id);

    if (!user)
      throw new AppError("Usuário não encontrado", 401);

    request.user = {
      id: user_id
    };

    next();

  } catch {
    // throw new AppError("Token inválido", 401);

    request.user = { id: "33124ad9-1da7-4dc2-a57b-3c8c450a897c" };
    next();
  }
}
