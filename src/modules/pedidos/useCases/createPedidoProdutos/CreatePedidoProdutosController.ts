import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePedidoProdutosUseCase } from "./CreatePedidoProdutosUseCase";

export class CreatePedidoProdutosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreatePedidoProdutosUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}