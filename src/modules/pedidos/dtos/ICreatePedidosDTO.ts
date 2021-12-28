export interface ICreatePedidosDTO {
  id?: string;
  id_empresa: string;
  id_cliente: string;
  id_cidades: number;
  total: number;
  desconto: number;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
}