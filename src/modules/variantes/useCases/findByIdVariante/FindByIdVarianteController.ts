import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdVarianteUseCase } from "./FindByIdVarianteUseCase";

export class FindByIdVarianteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindByIdVarianteUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}