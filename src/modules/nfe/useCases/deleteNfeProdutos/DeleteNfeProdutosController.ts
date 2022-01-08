import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNfeProdutosUseCase } from "./DeleteNfeProdutosUseCase";

export class DeleteNfeProdutosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteNfeProdutosUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}