import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteFinanceiroUseCase } from "./DeleteFinanceiroUseCase";

export class DeleteFinanceiroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteFinanceiroUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}