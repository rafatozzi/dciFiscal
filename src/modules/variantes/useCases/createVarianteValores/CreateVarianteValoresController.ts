import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVarianteValoresUseCase } from "./CreateVarianteValoresUseCase";

export class CreateVarianteValoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body

    const useCase = container.resolve(CreateVarianteValoresUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}