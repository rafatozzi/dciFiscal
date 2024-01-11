import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePedidoPgtosUseCase } from "./DeletePedidoPgtosUseCase";

export class DeletePedidoPgtosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeletePedidoPgtosUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}