export interface ICreateClientesDTO {
  id?: string;
  id_cidades: number;
  fantasia: string;
  razao_social: string;
  cpf_cnpj: number;
  rg_ie: number;
  email: string;
  telefone: number;
  celular: number;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  favorito: boolean;
}