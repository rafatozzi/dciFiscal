import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCaixaUseCase } from "./FindAllCaixaUseCase";

export class FindAllCaixaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa, limit, cursor } = request.body;

    const useCase = container.resolve(FindAllCaixaUseCase);

    const result = useCase.execute(request.cod_cliente, pesquisa, limit, cursor);

    return response.status(200).json(result);
  }
}