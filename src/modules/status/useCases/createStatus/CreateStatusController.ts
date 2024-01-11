import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateStatusDTO } from "../../dtos/ICreateStatusDTO";
import { CreateStatusUseCase } from "./CreateStatusUseCase";


export class CreateStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, ordem, id } = request.body as ICreateStatusDTO;

    const useCase = container.resolve(CreateStatusUseCase);

    const result = await useCase.execute(request.cod_cliente, { nome, ordem, id });

    return response.status(200).json(result);
  }
}