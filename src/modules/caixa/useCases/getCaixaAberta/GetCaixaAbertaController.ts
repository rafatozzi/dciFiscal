import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCaixaAbertaUseCase } from "./GetCaixaAbertaUseCase";

export class GetCaixaAbertaController {
  async handle(request: Request, response: Response): Promise<Response> {

    const useCase = container.resolve(GetCaixaAbertaUseCase);

    const result = await useCase.execute(request.cod_cliente);

    return response.status(200).json(result);
  }
}