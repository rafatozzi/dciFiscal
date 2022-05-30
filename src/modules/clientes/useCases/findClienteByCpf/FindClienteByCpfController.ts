import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindClienteByCpfUseCase } from "./FindClienteByCpfUseCase";

export class FindClienteByCpfController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const useCase = container.resolve(FindClienteByCpfUseCase);

    const result = await useCase.execute(request.cod_cliente, cpf);

    return response.status(200).json(result);
  }
}