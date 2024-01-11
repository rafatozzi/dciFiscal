import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFavoritosUseCase } from "./FindFavoritosUseCase";

export class FindFavoritosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(FindFavoritosUseCase);

    const result = await useCase.execute(request.cod_cliente);

    return response.status(200).json(result);
  }
}