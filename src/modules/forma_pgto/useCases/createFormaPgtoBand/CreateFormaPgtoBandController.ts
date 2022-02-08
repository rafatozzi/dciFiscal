import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFormaPgtoBandUseCase } from "./CreateFormaPgtoBandUseCase";

export class CreateFormaPgtoBandController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const useCase = container.resolve(CreateFormaPgtoBandUseCase);

    await useCase.execute(request.cod_cliente, data);

    return response.status(200).send();
  }
}