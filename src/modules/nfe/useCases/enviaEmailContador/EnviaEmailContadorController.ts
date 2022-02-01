import { Request, Response } from "express";
import { container } from "tsyringe";
import { EnviaEmailContadorUseCase } from "./EnviaEmailContadorUseCase";

export class EnviaEmailContadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idEmpresa, mes, ano } = request.body;

    const useCase = container.resolve(EnviaEmailContadorUseCase);

    const result = await useCase.execute(request.cod_cliente, idEmpresa, mes, ano);

    return response.status(200).send();
  }
}