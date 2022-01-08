import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNfePgtosUseCase } from "./DeleteNfePgtosUseCase";

export class DeleteNfePgtosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteNfePgtosUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}