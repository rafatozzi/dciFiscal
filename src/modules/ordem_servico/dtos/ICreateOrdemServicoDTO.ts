export interface ICreateOrdemServicoDTO {
  id?: string;
  id_empresa: string;
  id_cliente: string;
  id_user: string;
  id_status: string;
  descricao: string;
  previsao: Date;
}