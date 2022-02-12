import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOrdemServicoByIdUseCase } from "./FindOrdemServicoByIdUseCase";

export class FindOrdemServicoByIdController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const useCase = container.resolve(FindOrdemServicoByIdUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}