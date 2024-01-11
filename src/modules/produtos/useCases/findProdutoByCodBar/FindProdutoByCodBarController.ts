import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProdutoByCodBarUseCase } from "./FindProdutoByCodBarUseCase";

export class FindProdutoByCodBarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cod_barras } = request.body;

    const useCase = container.resolve(FindProdutoByCodBarUseCase);

    const result = await useCase.execute(request.cod_cliente, cod_barras);

    return response.status(200).json(result);
  }
}