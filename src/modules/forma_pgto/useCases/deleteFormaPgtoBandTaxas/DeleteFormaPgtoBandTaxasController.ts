import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFormaPgtoBandTaxasUseCase } from "./DeleteFormaPgtoBandTaxasUseCase";

export class DeleteFormaPgtoBandTaxasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteFormaPgtoBandTaxasUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}