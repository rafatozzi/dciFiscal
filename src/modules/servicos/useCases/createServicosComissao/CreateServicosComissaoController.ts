import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateServicosComissaoUseCase } from "./CreateServicosComissaoUseCase";

export class CreateServicosComissaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateServicosComissaoUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}