import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateNcmAliquotaDTO } from "../../dtos/ICreateNcmAliquotaDTO";
import { CreateNcmAliquotasUseCase } from "./CreateNcmAliquotasUseCase";

export class CreateNcmAliquotasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateNcmAliquotaDTO;

    const useCase = container.resolve(CreateNcmAliquotasUseCase);

    const result = await useCase.execute(request.cod_cliente, data);

    return response.status(200).json(result);
  }
}