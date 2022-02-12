import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrdemServicoPgtoUseCase } from "./DeleteOrdemServicoPgtoUseCase";

export class DeleteOrdemServicoPgtoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteOrdemServicoPgtoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}