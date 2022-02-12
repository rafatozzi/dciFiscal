import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrdemServicoUseCase } from "./DeleteOrdemServicoUseCase";

export class DeleteOrdemServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteOrdemServicoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}