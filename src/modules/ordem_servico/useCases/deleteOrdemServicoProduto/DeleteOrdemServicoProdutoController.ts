import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrdemServicoProdutoUseCase } from "./DeleteOrdemServicoProdutoUseCase";

export class DeleteOrdemServicoProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteOrdemServicoProdutoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}