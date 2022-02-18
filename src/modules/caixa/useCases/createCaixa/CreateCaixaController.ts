import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateCaixaDTO } from "../../dtos/ICreateCaixaDTO";
import { CreateCaixaUseCase } from "./CreateCaixaUseCase";

export class CreateCaixaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateCaixaDTO;

    const useCase = container.resolve(CreateCaixaUseCase);

    const result = useCase.execute(request.cod_cliente, data);

    return response.status(200).json(result);
  }
}