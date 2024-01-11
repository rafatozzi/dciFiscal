import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../errors/AppError";

export async function midConnection(request: Request, response: Response, next: NextFunction) {
  const { cod_cliente } = request.headers;

  if (!cod_cliente)
    throw new AppError("Código do Cliente não confirmado");

  request.cod_cliente = `${cod_cliente}`;

  next();
}