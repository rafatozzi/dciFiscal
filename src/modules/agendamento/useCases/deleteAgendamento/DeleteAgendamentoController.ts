import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAgendamentoUseCase } from "./DeleteAgendamentoUseCase";

export class DeleteAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const useCase = container.resolve(DeleteAgendamentoUseCase);

    await useCase.execute(request.cod_cliente, id);

    return response.status(200).send();
  }
}