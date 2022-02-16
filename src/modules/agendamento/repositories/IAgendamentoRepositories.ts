import { ICreateAgendamentoDTO } from "../dtos/ICreateAgendamentoDTO";
import { IFiltersAgendamentoDTO } from "../dtos/IFiltersAgendamentoDTO";
import { IListAgendamentoDTO } from "../dtos/IListAgendamentoDTO";
import { Agendamentos } from "../infra/typeorm/entities/Agendamento";

export interface IAgendamentoRepositories {
  create(data: ICreateAgendamentoDTO): Promise<Agendamentos>;
  findAll(pesquisa?: IFiltersAgendamentoDTO, limit?: number, cursor?: number): Promise<IListAgendamentoDTO>;
  findById(id: string): Promise<Agendamentos>;
  deleteById(id: string): Promise<void>;
}