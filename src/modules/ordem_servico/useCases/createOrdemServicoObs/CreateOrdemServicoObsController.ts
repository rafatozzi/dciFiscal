import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrdemServicoObsUseCase } from "./CreateOrdemServicoObsUseCase";

export class CreateOrdemServicoObsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateOrdemServicoObsUseCase);

    await useCase.execute(request.cod_cliente, data, request.user.id);

    return response.status(200).send();
  }
}