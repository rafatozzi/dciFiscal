export interface ICreateServicoDTO {
  id?: string;
  nome: string;
  recorrente: boolean;
  recorrente_dias: number;
  valor: number;
}