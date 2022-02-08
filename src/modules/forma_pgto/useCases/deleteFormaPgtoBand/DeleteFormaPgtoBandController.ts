import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFormaPgtoBandUseCase } from "./DeleteFormaPgtoBandUseCase";

export class DeleteFormaPgtoBandController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteFormaPgtoBandUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}