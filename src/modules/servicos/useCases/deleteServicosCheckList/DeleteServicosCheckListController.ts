import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteServicosCheckListUseCase } from "./DeleteServicosCheckListUseCase";

export class DeleteServicosCheckListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteServicosCheckListUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}