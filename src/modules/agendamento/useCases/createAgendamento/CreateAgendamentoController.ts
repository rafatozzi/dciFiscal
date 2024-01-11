import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateAgendamentoDTO } from "../../dtos/ICreateAgendamentoDTO";
import { CreateAgendamentoUseCase } from "./CreateAgendamentoUseCase";

export class CreateAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {

    const {
      data_agendamento,
      descricao,
      id_cliente,
      urgente,
      concluido,
      id
    } = request.body as ICreateAgendamentoDTO;

    const useCase = container.resolve(CreateAgendamentoUseCase);

    const result = await useCase.execute(request.cod_cliente, {
      data_agendamento,
      descricao,
      id_cliente,
      urgente,
      concluido,
      id
    });

    return response.status(200).json(result);
  }
}