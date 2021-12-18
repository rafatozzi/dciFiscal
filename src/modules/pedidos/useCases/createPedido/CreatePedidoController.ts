import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreatePedidosDTO } from "../../dtos/ICreatePedidosDTO";
import { CreatePedidoUseCase } from "./CreatePedidoUseCase";

export class CreatePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_cliente, id, id_empresa, total } = request.body as ICreatePedidosDTO;

    const useCase = container.resolve(CreatePedidoUseCase);

    const result = await useCase.execute({ id_cliente, id, id_empresa, total });

    return response.status(200).json(result);
  }
}