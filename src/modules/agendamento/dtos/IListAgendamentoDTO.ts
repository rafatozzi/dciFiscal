import { Agendamentos } from "../infra/typeorm/entities/Agendamento";

export interface IListAgendamentoDTO {
  total: number;
  result: Agendamentos[];
}