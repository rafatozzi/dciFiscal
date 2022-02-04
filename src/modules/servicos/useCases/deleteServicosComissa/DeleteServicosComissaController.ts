import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteServicosComissaUseCase } from "./DeleteServicosComissaUseCase";

export class DeleteServicosComissaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteServicosComissaUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}