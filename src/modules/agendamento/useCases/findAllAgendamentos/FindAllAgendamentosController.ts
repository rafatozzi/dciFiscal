import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllAgendamentosUseCase } from "./FindAllAgendamentosUseCase";

export class FindAllAgendamentosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pesquisa, limit, cursor, orderBy } = request.body;

    const useCase = container.resolve(FindAllAgendamentosUseCase);

    const result = await useCase.execute(request.cod_cliente, pesquisa, limit, cursor, orderBy)

    return response.status(200).json(result);
  }
}