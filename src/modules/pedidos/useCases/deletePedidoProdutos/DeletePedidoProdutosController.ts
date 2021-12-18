import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePedidoProdutosUseCase } from "./DeletePedidoProdutosUseCase";

export class DeletePedidoProdutosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeletePedidoProdutosUseCase);

    await useCase.execute(id);

    return response.status(200).send();
  }
}