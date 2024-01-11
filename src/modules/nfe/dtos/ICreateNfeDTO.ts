export interface ICreateNfeDTO {
  id?: string;
  id_empresa: string;
  id_cliente: string;
  total: number;
  desconto: number;
  nr_nfe?: number;
  recibo?: string;
  chave?: string;
  status?: number;
  situacao?: string;
  motivo?: string;
  cancelado?: boolean;
  cancel_motivo?: string;
  protocolo?: string;
}