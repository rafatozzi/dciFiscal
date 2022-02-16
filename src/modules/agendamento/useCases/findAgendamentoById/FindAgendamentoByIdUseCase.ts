import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Agendamentos } from "../../infra/typeorm/entities/Agendamento";
import { AgendamentoRepositories } from "../../infra/typeorm/repositories/AgendamentoRepositories";

@injectable()
export class FindAgendamentoByIdUseCase {
  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<Agendamentos> {
    const repositories = new AgendamentoRepositories(cod_cliente);
    const agendamento = await repositories.findById(id);

    if (!agendamento)
      throw new AppError("Agendamento não encontrado");

    return agendamento;
  }
}