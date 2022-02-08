import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllFormaPgtoUseCase } from "./FindAllFormaPgtoUseCase";

export class FindAllFormaPgtoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa } = request.body;

    const useCase = container.resolve(FindAllFormaPgtoUseCase);

    const result = await useCase.execute(request.cod_cliente, pesquisa);

    return response.status(200).json(result);
  }
}