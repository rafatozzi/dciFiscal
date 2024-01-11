import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteServicosUseCase } from "./DeleteServicosUseCase";

export class DeleteServicosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteServicosUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}