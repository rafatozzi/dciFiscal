export interface ICreateAgendamentoDTO {
  id?: string;
  id_cliente: string;
  data_agendamento: Date;
  descricao: string;
  urgente: boolean;
  concluido?: boolean;
}