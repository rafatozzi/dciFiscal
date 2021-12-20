import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePedidoUseCase } from "./DeletePedidoUseCase";

export class DeletePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeletePedidoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}