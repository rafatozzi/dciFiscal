import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProdutoUseCase } from "./DeleteProdutoUseCase";

export class DeleteProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteProdutoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}