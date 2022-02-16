import { injectable } from "tsyringe";
import { IFiltersAgendamentoDTO } from "../../dtos/IFiltersAgendamentoDTO";
import { IListAgendamentoDTO } from "../../dtos/IListAgendamentoDTO";
import { AgendamentoRepositories } from "../../infra/typeorm/repositories/AgendamentoRepositories";

@injectable()
export class FindAllAgendamentosUseCase {
  constructor() { }

  async execute(cod_cliente: string, pesquisa?: IFiltersAgendamentoDTO, limit?: number, cursor?: number): Promise<IListAgendamentoDTO> {
    const repositories = new AgendamentoRepositories(cod_cliente);

    const result = await repositories.findAll(pesquisa, limit, cursor);

    return result;
  }
}