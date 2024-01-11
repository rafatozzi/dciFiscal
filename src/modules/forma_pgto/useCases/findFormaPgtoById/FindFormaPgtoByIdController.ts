import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFormaPgtoByIdUseCase } from "./FindFormaPgtoByIdUseCase";

export class FindFormaPgtoByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindFormaPgtoByIdUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}