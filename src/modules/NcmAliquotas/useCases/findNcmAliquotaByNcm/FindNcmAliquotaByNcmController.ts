import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindNcmAliquotaByNcmUseCase } from "./FindNcmAliquotaByNcmUseCase";

export class FindNcmAliquotaByNcmController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ncm } = request.params;

    const useCase = container.resolve(FindNcmAliquotaByNcmUseCase);

    const result = await useCase.execute(request.cod_cliente, ncm);

    return response.status(200).json(result);
  }
}