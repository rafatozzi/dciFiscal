import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllFinanceiroUseCase } from "./FindAllFinanceiroUseCase";

export class FindAllFinanceiroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa, limit, cursor } = request.body;

    const useCase = container.resolve(FindAllFinanceiroUseCase);

    const result = await useCase.execute(request.cod_cliente, pesquisa, limit, cursor);

    return response.status(200).json(result);
  }
}