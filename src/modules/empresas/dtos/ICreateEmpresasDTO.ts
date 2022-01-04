export interface ICreateEmpresasDTO {
  id?: string;
  id_cidades: number;
  razao: string;
  fantasia: string;
  cnpj: number;
  ie: number;
  crt: number;
  cep: number;
  fone: number;
  nr: number;
  bairro: string;
  complemento: string;
  endereco: string;
  nr_nfe: number;
  serie_nfe: number;
  ambiente: number;
  senha_cert: string;
  venc_cert?: Date;
}