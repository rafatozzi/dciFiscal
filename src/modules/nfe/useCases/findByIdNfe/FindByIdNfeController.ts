import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdNfeUseCase } from "./FindByIdNfeUseCase";

export class FindByIdNfeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindByIdNfeUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}