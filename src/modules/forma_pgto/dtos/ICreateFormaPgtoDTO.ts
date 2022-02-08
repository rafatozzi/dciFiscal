export interface ICreateFormaPgtoDTO {
  id?: string;
  nome: string;
  max_parcelas: number;
  intervalo_parcelas: number;
  primeira_parcela_dias: number;
  tipo_recebimento: string;
}