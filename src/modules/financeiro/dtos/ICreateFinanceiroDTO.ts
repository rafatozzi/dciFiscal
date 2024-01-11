export interface ICreateFinanceiroDTO {
  id?: string;
  id_caixa: string;
  id_ordem_servico_pgtos?: string;
  descricao: string;
  credito?: number;
  debito?: number;
}