import { Request, Response } from "express";
import { container } from "tsyringe";
import { EmitirNfeUseCase } from "./EmitirNfeUseCase";

export class EmitirNfeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(EmitirNfeUseCase);

    const result = await useCase.execute(request.cod_cliente, id);

    return response.status(200).json(result);
  }
}