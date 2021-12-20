import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProdutoByIdUseCase } from "./FindProdutoUseCase";


export class FindProdutoByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindProdutoByIdUseCase);

    const result = await useCase.execute(id);

    return response.status(200).json(result);
  }
}