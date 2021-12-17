import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProdutoVarianteUseCase } from "./CreateProdutoVarianteUseCase";

export class CreateProdutoVarianteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateProdutoVarianteUseCase);

    await useCase.execute(data);

    return response.status(200).send();
  }
}