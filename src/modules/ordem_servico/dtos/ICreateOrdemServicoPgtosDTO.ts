export interface ICreateOrdemServicoPgtosDTO {
  id?: string;
  id_ordem_servico: string;
  id_forma_pgto: string;
  id_forma_pgto_band: string;
  qtd_parcela: number;
  taxa_recebimento: number;
  parc_procentagem: number;
}