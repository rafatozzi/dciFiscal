import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNfeUseCase } from "./DeleteNfeUseCase";

export class DeleteNfeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteNfeUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}