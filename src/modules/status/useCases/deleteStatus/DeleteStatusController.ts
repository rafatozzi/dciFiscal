import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteStatusUseCase } from "./DeleteStatusUseCase";

export class DeleteStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteStatusUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}