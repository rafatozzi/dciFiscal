import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVarianteValoresUseCase } from "./DeleteVarianteValoresUseCase";

export class DeleteVarianteValoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteVarianteValoresUseCase);

    await useCase.execute(id);

    return response.status(200).send();
  }
}