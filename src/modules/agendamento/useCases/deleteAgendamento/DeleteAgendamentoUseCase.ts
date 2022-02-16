import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { AgendamentoRepositories } from "../../infra/typeorm/repositories/AgendamentoRepositories";

@injectable()
export class DeleteAgendamentoUseCase {

  constructor() { }

  async execute(cod_cliente: string, id: string): Promise<void> {
    const repositories = new AgendamentoRepositories(cod_cliente);

    const agendamento = await repositories.findById(id);

    if (!agendamento)
      throw new AppError("Agendamento não encontrado");

    await repositories.deleteById(id);

  }
}