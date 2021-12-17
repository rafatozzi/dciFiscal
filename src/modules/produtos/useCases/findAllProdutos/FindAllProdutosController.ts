import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllProdutosUseCase } from "./FindAllProdutosUseCase";

export class FindAllProdutosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa, limit, cursor } = request.body;

    const useCase = container.resolve(FindAllProdutosUseCase);

    const result = await useCase.execute(pesquisa, limit, cursor);

    return response.status(200).json(result);
  }
}