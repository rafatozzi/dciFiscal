import { Request, Response } from "express";
import { container } from "tsyringe";
import { SolicitarCancelUseCase } from "./SolicitarCancelUseCase";

export class SolicitarCancelController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, motivo } = request.body;

    const useCase = container.resolve(SolicitarCancelUseCase);

    const result = await useCase.execute(request.cod_cliente, id, motivo);

    return response.status(200).json(result);
  }
}