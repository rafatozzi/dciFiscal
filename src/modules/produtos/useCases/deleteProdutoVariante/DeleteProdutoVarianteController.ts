import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProdutoVarianteUseCase } from "./DeleteProdutoVarianteUseCase";

export class DeleteProdutoVarianteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteProdutoVarianteUseCase);

    await useCase.execute(id);

    return response.status(200).send();
  }
}