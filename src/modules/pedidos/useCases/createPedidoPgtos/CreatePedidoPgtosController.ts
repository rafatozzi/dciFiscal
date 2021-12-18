import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePedidoPgtosUseCase } from "./CreatePedidoPgtosUseCase";

export class CreatePedidoPgtosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreatePedidoPgtosUseCase);

    await useCase.execute(data);

    return response.status(200).send();
  }
}