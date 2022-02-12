import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrdemServicoServicoUseCase } from "./DeleteOrdemServicoServicoUseCase";

export class DeleteOrdemServicoServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteOrdemServicoServicoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}