import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateAgendamentoDTO } from "../../dtos/ICreateAgendamentoDTO";
import { Agendamentos } from "../../infra/typeorm/entities/Agendamento";
import { AgendamentoRepositories } from "../../infra/typeorm/repositories/AgendamentoRepositories";

@injectable()
export class CreateAgendamentoUseCase {
  constructor() { }

  async execute(cod_cliente: string, data: ICreateAgendamentoDTO): Promise<Agendamentos> {
    const repositorie = new AgendamentoRepositories(cod_cliente);

    if (!data.id_cliente || data.id_cliente.length <= 3)
      throw new AppError("Cliente não informado");

    const agendamento = await repositorie.create(data);

    return agendamento;
  }

}