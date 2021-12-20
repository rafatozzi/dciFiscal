import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVarianteUseCase } from "./DeleteVarianteUseCase";

export class DeleteVarianteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteVarianteUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}