import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrdemServicoObsUseCase } from "./DeleteOrdemServicoObsUseCase";

export class DeleteOrdemServicoObsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteOrdemServicoObsUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}