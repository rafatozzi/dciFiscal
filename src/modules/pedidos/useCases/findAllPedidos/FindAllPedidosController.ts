import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllPedidosUseCase } from "./FindAllPedidosUseCase";

export class FindAllPedidosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa, limit, cursor } = request.body;

    const useCase = container.resolve(FindAllPedidosUseCase);

    const result = await useCase.execute(request.cod_cliente, pesquisa, limit, cursor);

    return response.status(200).json(result);
  }
}