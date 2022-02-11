export interface ICreateOrdemServicoProdutosDTO {
  id?: string;
  id_ordem_servico: string;
  id_produto: string;
  quantidade: number;
  valor_unit: number;
}