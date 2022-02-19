import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateFinanceiroDTO } from "../../dtos/ICreateFinanceiroDTO";
import { CreateFinanceiroUseCase } from "./CreateFinanceiroUseCase";

export class CreateFinanceiroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateFinanceiroDTO;

    const useCase = container.resolve(CreateFinanceiroUseCase);

    const result = await useCase.execute(request.cod_cliente, data)

    return response.status(200).json(result);
  }
}