import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindClienteByIdUseCase } from "./FindClienteById";

export class FindClienteByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindClienteByIdUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}