import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFormaPgtoBandTaxasUseCase } from "./CreateFormaPgtoBandTaxasUseCase";

export class CreateFormaPgtoBandTaxasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateFormaPgtoBandTaxasUseCase)

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}