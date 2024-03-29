import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFormaPgtoUseCase } from "./DeleteFormaPgtoUseCase";

export class DeleteFormaPgtoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteFormaPgtoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}