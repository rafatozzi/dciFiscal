import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdPedidoUseCase } from "./FindByIdPedidoUseCase";

export class FindByIdPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindByIdPedidoUseCase);

    const result = await useCase.execute(id);

    return response.status(200).json(result);
  }
}