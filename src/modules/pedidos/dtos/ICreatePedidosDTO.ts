export interface ICreatePedidosDTO {
  id?: string;
  id_empresa: string;
  id_cliente: string;
  id_cidades: number;
  total: number;
  desconto: number;
  valor_pago: number;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  local_venda: string;
}