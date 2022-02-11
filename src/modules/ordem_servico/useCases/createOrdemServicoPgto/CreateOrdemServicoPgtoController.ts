import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrdemServicoPgtoUseCase } from "./CreateOrdemServicoPgtoUseCase";

export class CreateOrdemServicoPgtoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateOrdemServicoPgtoUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}