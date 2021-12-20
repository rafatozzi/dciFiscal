import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClienteUseCase } from "./DeleteClienteUseCase";

export class DeleteClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteClienteUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}