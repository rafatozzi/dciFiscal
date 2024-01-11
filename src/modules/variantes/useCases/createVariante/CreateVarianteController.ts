import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVarianteUseCase } from "./CreateVarianteUseCase";

export class CreateVarianteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, nome } = request.body;

    const useCase = container.resolve(CreateVarianteUseCase);

    const result = await useCase.execute(request.cod_cliente, { id, nome });

    return response.status(200).json(result);
  }
}